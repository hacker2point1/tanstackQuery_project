"use client";

import { Box, Container, Typography, Button } from "@mui/material";

const ContactCTA = () => {
  const fontFamily = "var(--font-montserrat), sans-serif";

  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
        background: "linear-gradient(135deg, #12343b, #0d6e8a)",
        color: "#fff",

        // apply font globally inside this section
        fontFamily,
      }}
    >
      <Container>
        {/* HEADING */}
        <Typography
          fontSize="32px"
          fontWeight={700}
          sx={{ fontFamily }}
        >
          Need Immediate Help?
        </Typography>

        {/* SUBTEXT */}
        <Typography
          mt={2}
          sx={{ fontFamily }}
        >
          Call our emergency support now.
        </Typography>

        {/* BUTTON */}
        <Button
          href="tel:+919876543210"
          sx={{
            fontFamily,
            mt: 4,
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            background: "#fff",
            color: "#000",
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.3s ease",

            "&:hover": {
              background: "#f1f1f1",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
        >
          Call Now
        </Button>
      </Container>
    </Box>
  );
};

export default ContactCTA;