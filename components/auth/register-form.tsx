"use client";

import { useSignUpMutation } from "@/customHooks/query/auth.query.hooks";
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
import { useState, useRef } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm({
  onClose,
  onSwitch,
  onOtp,
}: {
  onClose?: () => void;
  onSwitch?: () => void;
  onOtp?: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useSignUpMutation({ redirectToOtp: false });

 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const passwordValue = watch("password");

  const onSubmit = (formData: any) => {
    mutate(formData, {
      onSuccess: () => {
        onOtp?.();
      },
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
        minWidth: { xs: "100%", sm: 420 },
      }}
    >
      <Stack spacing={2}>
        {/* HEADER */}
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#212B36" }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join us and start your journey
          </Typography>
        </Box>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {/* NAME */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                autoFocus
                {...register("first_name", {
                  required: "First name is required",
                })}
                label="First Name"
                fullWidth
                error={!!errors.first_name}
                helperText={errors.first_name?.message as string}
                onKeyDown={(e) =>
                  e.key === "Enter" && lastNameRef.current?.focus()
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "#fff",
                  },
                }}
              />

              <TextField
                inputRef={lastNameRef}
                {...register("last_name", {
                  required: "Last name is required",
                })}
                label="Last Name"
                fullWidth
                error={!!errors.last_name}
                helperText={errors.last_name?.message as string}
                onKeyDown={(e) =>
                  e.key === "Enter" && addressRef.current?.focus()
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "#fff",
                  },
                }}
              />
            </Stack>

            <TextField
              inputRef={addressRef}
              {...register("address", {
                required: "Address is required",
              })}
              label="Address"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message as string}
              onKeyDown={(e) =>
                e.key === "Enter" && emailRef.current?.focus()
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "#fff",
                },
              }}
            />

            <TextField
              inputRef={emailRef}
              {...register("email", { required: "Email is required" })}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message as string}
              onKeyDown={(e) =>
                e.key === "Enter" && passwordRef.current?.focus()
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "#fff",
                },
              }}
            />

            {/* PASSWORD */}
            <TextField
              inputRef={passwordRef}
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message as string}
              onKeyDown={(e) =>
                e.key === "Enter" && confirmPasswordRef.current?.focus()
              }
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
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              inputRef={confirmPasswordRef}
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message as string}
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
                      edge="end"
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

            {/* BUTTON */}
            <Button
              fullWidth
              size="large"
              type="submit"
              disableElevation
              sx={{
                mt: 1,
                height: 48,
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
              {isPending ? "Creating Account..." : "Register"}
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 1 }} />

        {/* SWITCH */}
        <Box textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <span
              onClick={onSwitch}
              style={{
                color: "#00A76F",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}