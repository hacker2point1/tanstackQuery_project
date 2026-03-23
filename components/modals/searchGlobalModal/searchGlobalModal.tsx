"use client";

import {
  Dialog,
  DialogContent,
  Fade,
  TextField,
  InputAdornment,
} from "@mui/material";

interface GlobalModalProps {
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function SearchGlobalModal({
  open,
  onClose,
  placeholder = "Type here...",
  icon,
}: GlobalModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              height: 56,
            },
          }}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ) : undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}