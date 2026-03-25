"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useState } from "react";
import LocationModal from "@/components/modals/locationModal/locationModal";

const LocationSection = () => {
  const [openLocationModal, setOpenLocationModal] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "400px", md: "550px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* google map */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7368.655332215068!2d88.36033880710607!3d22.566845077316955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276561eb7542d%3A0xbce75cd6f6d76d61!2sNRS%20MEDICAL%20COLLEGE%20AND%20HOSPITAL%2C%20Sealdah%2C%20Raja%20Bazar%2C%20Kolkata%2C%20West%20Bengal%20700014!5e0!3m2!1sen!2sin!4v1773943099029!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: "none" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6))",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: { xs: 0, md: 10 },
        }}
      >
        <Box maxWidth="600px">
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "32px", md: "48px" },
              mb: 2,
              fontFamily:"var(--font-montserrat), sans-serif",
              
            }}
          >
            Discover Our Location
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.6,
              mb: 4,
              fontFamily:"var(--font-montserrat), sans-serif",
            }}
          >
            Visit us at NRS Medical College and Hospital, located in the heart
            of Kolkata, providing accessible and trusted healthcare services.
          </Typography>

     
          <Stack direction="row" spacing={3} alignItems="center">
            <Button
              startIcon={<PlayArrowIcon />}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "30px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontFamily:"var(--font-montserrat), sans-serif",
              }}
            >
              Watch Video
            </Button>

            <Button
              endIcon={<ArrowOutwardIcon />}
              onClick={() => setOpenLocationModal(true)}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: 500,
                fontFamily:"var(--font-montserrat), sans-serif",
              }}
            >
              Discover More
            </Button>
          </Stack>
        </Box>
      </Box>

      <LocationModal
        open={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
      />
    </Box>
  );
};

export default LocationSection;



