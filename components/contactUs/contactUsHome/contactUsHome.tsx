"use client";

import { Box, Container, Typography } from "@mui/material";

const ContactHero = () => {
  const fontFamily = "var(--font-montserrat), sans-serif";

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #0d6e8a, #12343b)",
        color: "#fff",
        textAlign: "center",

        // ✅ apply globally
        fontFamily,
      }}
    >
      <Container>
        {/* HEADING */}
        <Typography
          fontSize={{ xs: 32, md: 48 }}
          fontWeight={700}
          sx={{ fontFamily }}
        >
          Contact Us
        </Typography>

        {/* SUBTEXT */}
        <Typography
          mt={2}
          color="#ddd"
          sx={{ fontFamily }}
        >
          We're here to help you 24/7. Reach out anytime.
        </Typography>
      </Container>
    </Box>
  );
};

export default ContactHero;