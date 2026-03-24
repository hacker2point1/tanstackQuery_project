"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

const faqs = [
  {
    question: "What services does Curewell Hospital provide?",
    answer:
      "Curewell Hospital offers a wide range of medical services including general medicine, surgery, cardiology, orthopedics, emergency care, diagnostics, and specialized treatments using advanced technology.",
  },
  {
    question: "Do I need an appointment before visiting?",
    answer:
      "While walk-ins are accepted for emergency and general consultations, we recommend booking an appointment in advance to avoid waiting.",
  },
  {
    question: "Is emergency service available 24/7?",
    answer:
      "Yes, Curewell Hospital provides 24/7 emergency services with a dedicated team ready at all times.",
  },
  {
    question: "Do you accept health insurance?",
    answer:
      "Yes, we accept a wide range of health insurance providers and support cashless claims.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const FAQSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(135deg, #f5f3f1, #ece7e3)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="flex-start"
        >
          {/* LEFT */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 500,
                color: "#2b2b2b",
                mb: 3,
                fontFamily:"var(--font-montserrat), sans-serif",
              }}
            >
              Frequently asked questions
            </Typography>

            <Box
              sx={{
                width: "60px",
                height: "2px",
                backgroundColor: "#ddd",
                mb: 3,
              }}
            />

            <Typography
              sx={{
                color: "#555",
                fontSize: "16px",
                mb: 3,
                lineHeight: 1.6,
                fontFamily:"var(--font-montserrat), sans-serif",
              }}
            >
              Can't find the answer you're looking for? We're here to help.
            </Typography>

           
            <Button
              component="a"
              href="tel:+919083877019" 
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{
                backgroundColor: "#2b2b2b",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: "30px",
                textTransform: "none",
                fontFamily:"var(--font-montserrat), sans-serif",

                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Get in touch
            </Button>
          </Box>

          {/* RIGHT */}
          <motion.div
            style={{ flex: 1.5, width: "100%" }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => {
              const isOpen = expanded === index;

              return (
                <motion.div key={index} variants={itemVariants}>
                  <Box
                    sx={{
                      mb: 2,
                      borderRadius: "20px",
                      backdropFilter: "blur(12px)",
                      background: "rgba(255, 255, 255, 0.6)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* HEADER */}
                    <Box
                      onClick={() => handleToggle(index)}
                      sx={{
                        px: 3,
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "#2b2b2b",
                          fontFamily:"var(--font-montserrat), sans-serif",
                        }}
                      >
                        {faq.question}
                      </Typography>

                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconButton size="small">
                          <AddIcon />
                        </IconButton>
                      </motion.div>
                    </Box>

                    {/* content  */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ overflow: "hidden" }}
                    >
                      <Box
                        sx={{
                          px: 3,
                          pb: 2,
                          color: "#666",
                          lineHeight: 1.7,
                          fontFamily:"var(--font-montserrat), sans-serif",
                        }}
                      >
                        {faq.answer}
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              );
            })}
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default FAQSection;