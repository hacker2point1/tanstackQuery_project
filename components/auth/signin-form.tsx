"use client";

import { useSignInMutation } from "@/customHooks/query/auth.query.hooks";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Box,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ResetPasswordModal from "./resetPassword/resetPassword";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm({
  onClose,
  onSwitch,
}: {
  onClose?: () => void;
  onSwitch?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [openReset, setOpenReset] = useState(false);

  // ✅ password toggle state
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignInMutation();

  const onSubmit = (formData: { email: string; password: string }) => {
    const Data = {
      email: formData.email,
      password: formData.password,
    };

    mutate(Data as any, {
      onSuccess: () => {
        onClose?.();
      },
    });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
          minWidth: { xs: "100%", sm: 380 },
        }}
      >
        <Stack spacing={2}>
          {/* header */}
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#212B36" }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Login to continue your journey
            </Typography>
          </Box>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                {...register("email", { required: "Email is required" })}
                label="Email"
                fullWidth
                size="medium"
                error={!!errors.email}
                helperText={errors.email?.message as string}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "#fff",
                  },
                }}
              />

              {/* 🔐 PASSWORD WITH TOGGLE */}
              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                size="medium"
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
                        edge="end"
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

              {/* forgot password */}
              <Box display="flex" justifyContent="flex-end">
                <Typography
                  fontSize="13px"
                  sx={{
                    cursor: "pointer",
                    color: "#00A76F",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => setOpenReset(true)}
                >
                  Forgot Password?
                </Typography>
              </Box>

              {/* login-button */}
              <Button
                fullWidth
                size="large"
                type="submit"
                disableElevation
                sx={{
                  mt: 1,
                  height: 45,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #212B36, #000000)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #000000, #212B36)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 1 }} />

          {/* switch */}
          <Box textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{" "}
              <span
                onClick={onSwitch}
                style={{
                  color: "#00A76F",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* reset modal */}
      <ResetPasswordModal
        open={openReset}
        handleClose={() => setOpenReset(false)}
      />
    </>
  );
}