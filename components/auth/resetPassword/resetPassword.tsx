"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { useForm } from "react-hook-form";
import { useResetLinkMutation } from "@/customHooks/query/auth.query.hooks";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useResetLinkMutation();

  const onSubmit = (data: any) => {
    mutate(
      { email: data.email },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      BackdropProps={{
        sx: {
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff, #f4f6f8)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* header */}
        <Box
          sx={{
            px: 3,
            py: 3,
            borderBottom: "1px solid #eee",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "#212B36",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "12px",
                background: "#E8F5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmailOutlinedIcon sx={{ color: "#00A76F" }} />
            </Box>

            <Box>
              <Typography fontSize="18px" fontWeight={700}>
                Reset Password
              </Typography>
              <Typography fontSize="13px" color="text.secondary">
                Enter your email to receive reset link
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* body */}
        <Box sx={{ px: 3, py: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              fullWidth
              size="medium"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "#fff",
                },
              }}
            />

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
                background: "linear-gradient(135deg, #212B36, #000000)",
                color: "#fff",

                //keep the disabled white text
                "&.Mui-disabled": {
                  color: "#fff",
                  opacity: 0.8,
                },

                "&:hover": {
                  background: "linear-gradient(135deg, #000000, #212B36)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;

//if i want the circular loader use this code
// import CircularProgress from "@mui/material/CircularProgress";

// {isPending ? (
//   <CircularProgress size={20} sx={{ color: "#fff" }} />
// ) : (
//   "Send Reset Link"
// )}