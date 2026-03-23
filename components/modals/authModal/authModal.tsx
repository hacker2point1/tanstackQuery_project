"use client";

import { Dialog, DialogContent, Fade } from "@mui/material";

export default function AuthModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)", 
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 2,
        },
      }}
    >
          <DialogContent>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <img src="/img/logo3.png" alt="Logo" style={{ height: 64, objectFit: "contain" }} />
            </div>
            {children}
          </DialogContent>
    </Dialog>
  );
}