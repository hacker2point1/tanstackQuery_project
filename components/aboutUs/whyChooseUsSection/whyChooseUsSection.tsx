"use client";

import { Box, Typography, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  "24/7 Emergency Care",
  "Expert Doctors",
  "Modern Technology",
  "Affordable Care",
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 10, md: 14 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(180deg, #070F22 0%, #0B1736 100%)"
          : "linear-gradient(180deg, #f4f9fc 0%, #ffffff 100%)",
      }}
    >
      {/* Glow Effects */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#1878A2",
          opacity: 0.12,
          filter: "blur(120px)",
          top: "-100px",
          left: "10%",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#E780A9",
          opacity: 0.12,
          filter: "blur(120px)",
          bottom: "-100px",
          right: "10%",
        }}
      />

      {/* Heading */}
      <Typography
        fontSize={{ xs: 28, md: 42 }}
        fontWeight={800}
        textAlign="center"
        mb={6}
        sx={{
          background: "linear-gradient(90deg,#1878A2,#E780A9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Why Choose Us
      </Typography>

      {/* Centered Grid Wrapper */}
      <Box
        sx={{
          maxWidth: "1100px",   // 👈 controls centering width
          mx: "auto",          // 👈 centers horizontally
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {features.map((itemText, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div variants={item}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      textAlign: "center",
                      backdropFilter: "blur(12px)",
                      background: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.85)",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.05)",
                      boxShadow: isDark
                        ? "0 10px 40px rgba(0,0,0,0.4)"
                        : "0 10px 30px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",

                      "&:hover": {
                        transform: "translateY(-10px) scale(1.02)",
                        boxShadow:
                          "0 20px 50px rgba(24,120,162,0.25)",
                      },
                    }}
                  >
                    {/* Top Gradient Bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background:
                          "linear-gradient(90deg,#1878A2,#E780A9)",
                      }}
                    />

                    <Typography
                      fontWeight={700}
                      fontSize={16}
                      sx={{
                        color: isDark ? "#fff" : "#1a202c",
                      }}
                    >
                      {itemText}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
};

export default WhyChooseUs;