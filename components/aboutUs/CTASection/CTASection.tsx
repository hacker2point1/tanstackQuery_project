"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #0d6e8a, #12343b)",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography fontSize="36px" fontWeight={700}>
            Your Health, Our Priority
          </Typography>

          <Button
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              background: "#fff",
              color: "#000",
            }}
          >
            Book Appointment
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTASection;