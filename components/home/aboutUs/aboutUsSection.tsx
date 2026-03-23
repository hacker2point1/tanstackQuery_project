"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const AboutUsBanner = () => {

  const imageUrl = "/img/aboutus.jpg"; 

  const statsData = [
    {
      top: { number: "25", label: "Specialties" },
      bottomLeft: { number: "03", label: "Research Units" },
      bottomRight: { number: "125+", label: "Experts" },
    },
    {
      top: { number: "50+", label: "Departments" },
      bottomLeft: { number: "10+", label: "ICU Units" },
      bottomRight: { number: "200+", label: "Doctors" },
    },
    {
      top: { number: "1L+", label: "Patients Treated" },
      bottomLeft: { number: "24/7", label: "Emergency Care" },
      bottomRight: { number: "15+", label: "Years Experience" },
    },
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % statsData.length);
        setAnimate(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = statsData[index];

  const transitionStyle = {
    transition: "all 0.4s ease",
    opacity: animate ? 1 : 0,
    transform: animate ? "translateY(0px)" : "translateY(10px)",
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* about us*/}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(180deg, #f7f2f5 0%, #f3e6dc 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontWeight: 700,
              color: "#12343b",
              lineHeight: 1.3,
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontFamily:"var(--font-montserrat), sans-serif"
            }}
          >
            We are a world class healthcare establishment built on a culture of{" "}
            <Box component="span" sx={{ color: "#e67aa0" }}>
              empathy, care and compassion.
            </Box>
          </Typography>

          <Typography sx={{ mt: 3, color: "#2f4f4f", lineHeight: 1.8,fontFamily:"var(--font-montserrat), sans-serif" }}>
            Our top-notch doctors, cutting-edge technology and patient-first
            values have equipped us to create an institution that offers
            excellent treatment for all those who come seeking wellness and good
            health.
          </Typography>

          {/* ✅ ROTATING ARROW BUTTON */}
          <Button
            component={Link}
            href="/about"
            sx={{
              mt: 5,
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              backgroundColor: "#0d6e8a",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontFamily:"var(--font-montserrat), sans-serif",
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "#094d63",
              },

              "&:hover .arrow": {
                transform: "rotate(45deg) translateX(4px)",
              },
            }}
          >
            About Us

            <Box
              className="arrow"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.4s ease",
                
              }}
            >
              <ArrowOutwardIcon />
            </Box>
          </Button>
        </Container>
      </Box>

      {/* at a glance */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 6 },
          background: "linear-gradient(to right, #e9e6e6, #f3e3cc)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            borderRadius: "40px",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: 2,
              position: "relative",
              minHeight: { xs: "300px", md: "420px" },
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: { xs: 20, md: 40 },
                left: { xs: 20, md: 40 },
                color: "#fff",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "28px", md: "44px" },
                  fontWeight: 700,
                  fontFamily:"var(--font-montserrat), sans-serif",
                  letterSpacing:1
                }}
              >
                Curewell Hospitals <br /> at a glance
              </Typography>
            </Box>
          </Box>

          {/* RIGHT STATS */}
          <Box
            sx={{
              flex: 0.8,
              backgroundColor: "#1678a2",
              color: "#fff",
              px: { xs: 4, md: 6 },
              py: { xs: 5, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={transitionStyle}>
              <Typography sx={{ fontSize: "48px", fontWeight: 700,fontFamily:"var(--font-montserrat), sans-serif" }}>
                {current.top.number}
              </Typography>
              <Typography sx={{fontFamily:"var(--font-montserrat), sans-serif"}}>{current.top.label}</Typography>
            </Box>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.3)" }} />

            <Stack direction="row" spacing={4}>
              <Box sx={transitionStyle}>
                <Typography sx={{ fontSize: "40px", fontWeight: 700,fontFamily:"var(--font-montserrat), sans-serif" }}>
                  {current.bottomLeft.number}
                </Typography>
                <Typography sx={{fontFamily:"var(--font-montserrat), sans-serif"}}>{current.bottomLeft.label}</Typography>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box sx={transitionStyle}>
                <Typography sx={{ fontSize: "40px", fontWeight: 700,fontFamily:"var(--font-montserrat), sans-serif" }}>
                  {current.bottomRight.number}
                </Typography>
                <Typography sx={{fontFamily:"var(--font-montserrat), sans-serif"}}>{current.bottomRight.label}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsBanner;