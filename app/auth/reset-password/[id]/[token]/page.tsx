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
import { useState } from "react";
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
          router.push("/");
        },
      }
    );
  };

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
          
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Box
              component="img"
              src="/img/logo3.png"
              alt="Logo"
              sx={{ height: 64, objectFit: "contain" }}
            />
          </Box>

          {/* header */}
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#212B36" }}
            >
              Reset Password
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Enter your new password below
            </Typography>
          </Box>

          {/* form */}
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

              {/* confirm-password */}
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
                disableElevation
                sx={{
                  mt: 1,
                  height: 48,
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
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;