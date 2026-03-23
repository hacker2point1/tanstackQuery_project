"use client";

import { fadeUp } from "@/components/animations/fadeUpAnimation/fadeUp";
import { Box, Typography, Stack, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";

const AboutIntro = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 10, md: 14 },
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",

        // 🌈 Theme Gradient Background
        background: isDark
          ? "linear-gradient(180deg, #0B1736 0%, #070F22 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f4f9fc 100%)",
      }}
    >
      {/* 🔥 Blue Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#1878A2",
          opacity: 0.15,
          filter: "blur(120px)",
          top: "-120px",
          left: "30%",
          transform: "translateX(-50%)",
        }}
      />

      {/* 💗 Pink Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#E780A9",
          opacity: 0.12,
          filter: "blur(120px)",
          bottom: "-120px",
          right: "30%",
          transform: "translateX(50%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Stack spacing={4} alignItems="center">

            {/* 🌟 Heading with Brand Gradient */}
            <Typography
              fontSize={{ xs: 30, md: 48 }}
              fontWeight={800}
              lineHeight={1.2}
              sx={{
                background: "linear-gradient(90deg,#1878A2,#E780A9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Who We Are
            </Typography>

            {/* 📄 Description */}
            <Typography
              fontSize={{ xs: 15, md: 18 }}
              lineHeight={1.8}
              sx={{
                color: isDark
                  ? "rgba(255,255,255,0.75)"
                  : "#4a5568",
                maxWidth: "720px",
              }}
            >
              At Curewell Hospital, we blend compassionate care with modern
              medical innovation. Our expert team is committed to delivering
              personalized treatment using advanced technology, ensuring every
              patient receives the highest standard of healthcare in a safe and
              supportive environment.
            </Typography>

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutIntro;