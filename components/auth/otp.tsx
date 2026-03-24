"use client";

import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { toast } from "sonner";

import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";

const Otp: React.FC<{
  onClose?: () => void;
  onSuccess?: () => void;
  redirectToSignIn?: boolean;
}> = ({ onClose, onSuccess, redirectToSignIn = true }) => {
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("email")
      : null;

  const { handleSubmit } = useForm();
  const { mutate, isPending } = useOtpMutation({
    redirectToSignIn,
    onSuccess,
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Handle typing
  const handleChange = (e: any, index: number) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Auto backspace support
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Auto paste full OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasteData.split("").forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
      }
    });

    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputsRef.current[nextIndex]?.focus();
  };

  const onSubmit = () => {
    const otpValue = inputsRef.current
      .map((input) => input?.value || "")
      .join("");

    const uid = userId ?? "";
    if (!uid) {
      toast.error("Missing userId, please retry login");
      return;
    }

    const Data: any = {
      userId: uid,
      otp: otpValue,
    };

    mutate(Data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Stack spacing={2}>
          {/* HEADER */}
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#212B36" }}
          >
            OTP Verification
          </Typography>

          <Typography variant="body2" color="text.secondary">
            OTP sent to <strong>{email}</strong>
          </Typography>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* OTP INPUTS */}
              <Stack direction="row" spacing={1} justifyContent="center">
                {Array.from({ length: 6 }).map((_, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 600,
                      },
                    }}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    sx={{
                      width: 45,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        background: "#fff",
                      },
                    }}
                  />
                ))}
              </Stack>

              {/* BUTTON */}
              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                disableElevation
                sx={{
                  height: 45,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #212B36, #000000)",
                  color: "#fff",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #000000, #212B36)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {isPending ? "Verifying..." : "Verify OTP"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Otp;