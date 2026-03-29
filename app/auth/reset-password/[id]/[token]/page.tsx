"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { toast } from "sonner";
import { useResetPasswordMutation } from "@/customHooks/query/auth.query.hooks";

const ResetPasswordPage = () => {
  const { id, token } = useParams();
  const router = useRouter();

  const { mutate, isPending } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //countdown states
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const passwordValue = watch("password");

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutate(
      {
        id: id as string,
        token: token as string,
        password: data.password,
        confirm_password: data.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful 🎉");
          setIsSuccess(true);
        },
      }
    );
  };
//countdown use effect
  useEffect(() => {
    if (!isSuccess) return;

    if (countdown === 0) {
      router.push("/"); // change route if needed
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSuccess, countdown, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "420px",
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
        }}
      >
        <Stack spacing={2}>
          {/* logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Box
              component="img"
              src="/img/logo3.png"
              alt="Logo"
              sx={{ height: 64 }}
            />
          </Box>

          {/* header */}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Reset Password
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Enter your new password below
            </Typography>
          </Box>

          {/* success state */}
          {isSuccess ? (
            <Box textAlign="center" py={3}>
              <Typography fontWeight={600} mb={1}>
                ✅ Password updated successfully
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Redirecting in {countdown}s...
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {/* password */}
                <TextField
                  {...register("password", {
                    required: "Password is required",
                  })}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      background: "#fff",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* confirm password */}
                <TextField
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === passwordValue ||
                      "Passwords do not match",
                  })}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message as string}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      background: "#fff",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* button */}
                <Button
                  type="submit"
                  fullWidth
                  disabled={isPending}
                  sx={{
                    height: 48,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #212B36, #000000)",
                    color: "#fff",

                    "&.Mui-disabled": {
                      color: "#fff",
                      opacity: 0.8,
                    },
                  }}
                >
                  {isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;

