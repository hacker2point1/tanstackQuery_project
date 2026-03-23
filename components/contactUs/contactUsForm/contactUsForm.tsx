"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Stack,
  useTheme,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";

const ContactForm = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const fontFamily = "var(--font-montserrat), sans-serif";

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 10, md: 14 },
        px: { xs: 2, md: 6 },
        display: "flex",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(180deg, #070F22 0%, #0B1736 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f4f9fc 100%)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <Box flex={1}>
          <Stack spacing={3}>
            <Typography
              fontSize={{ xs: 28, md: 40 }}
              fontWeight={800}
              sx={{
                fontFamily,
                background: "linear-gradient(90deg,#1878A2,#E780A9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get in Touch
            </Typography>

            <Typography
              sx={{
                fontFamily,
                color: isDark ? "rgba(255,255,255,0.75)" : "#555",
                lineHeight: 1.8,
                maxWidth: "500px",
              }}
            >
              Have questions or need assistance? Our team at Curewell Hospital is
              here to help you. Reach out to us anytime and we will respond as
              quickly as possible.
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              {/* CALL */}
              <Button
                component="a"
                href="tel:+919876543210"
                startIcon={<Phone />}
                sx={{
                  fontFamily,
                  borderRadius: "999px",
                  px: 3,
                  py: 1.2,
                  background:
                    "linear-gradient(135deg,#1878A2,#2aa4d6)",
                  color: "#fff",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#156b90,#1f8bb8)",
                  },
                }}
              >
                Call Us
              </Button>

              {/* EMAIL */}
              <Button
                component="a"
                href="mailto:curewellhospital@gmail.com"
                startIcon={<Email />}
                variant="outlined"
                sx={{
                  fontFamily,
                  borderRadius: "999px",
                  px: 3,
                  py: 1.2,
                  borderColor: "#E780A9",
                  color: "#E780A9",
                  "&:hover": {
                    background: "rgba(231,128,169,0.08)",
                    borderColor: "#E780A9",
                  },
                }}
              >
                Email Us
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT SIDE */}
        <Box flex={1} width="100%">
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.9)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.05)",
              boxShadow: isDark
                ? "0 10px 40px rgba(0,0,0,0.4)"
                : "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                InputLabelProps={{ sx: { fontFamily } }}
                InputProps={{ sx: { fontFamily } }}
              />
              <TextField
                fullWidth
                label="Email"
                InputLabelProps={{ sx: { fontFamily } }}
                InputProps={{ sx: { fontFamily } }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                InputLabelProps={{ sx: { fontFamily } }}
                InputProps={{ sx: { fontFamily } }}
              />

              <Button
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                  fontFamily,
                  mt: 1,
                  py: 1.5,
                  borderRadius: "50px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg,#1878A2,#E780A9)",
                  color: "#fff",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#156b90,#d96c95)",
                  },
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* TOAST */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ fontFamily }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;