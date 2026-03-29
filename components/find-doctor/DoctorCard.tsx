"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

// Type definition for component props
interface DoctorCardProps {
  doc: any; // Doctor object with all doctor information
  onOpenModal: (slot?: { date?: string; time?: string }) => void; // Function to open booking modal
}

/**
 * DoctorCard Component
 *
 * Displays a single doctor's information in a card format.
 * Shows doctor image, name, rating, specialty, experience, location, and booking button.
 *
 * @param doc - Doctor object containing all doctor details
 * @param onOpenModal - Function called when user clicks "View Profile & Book"
 */
export default function DoctorCard({ doc, onOpenModal }: DoctorCardProps) {
  return (
    // ===== MAIN CARD CONTAINER =====
    <Box
      sx={{
        borderRadius: "20px",           // Rounded corners
        overflow: "hidden",             // Hide content that goes outside rounded corners
        background: "#fff",             // White background
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)", // Subtle shadow for depth
        transition: "0.3s",             // Smooth animation for hover effect
        "&:hover": { transform: "translateY(-6px)" }, // Lift card on hover
      }}
    >
      {/* ===== DOCTOR IMAGE SECTION ===== */}
      <Box
        sx={{
          height: 220,                          // Fixed height for consistent layout
          backgroundImage: `url(${doc.assignedImage || "/img/doctor1.jpg"})`, // Doctor's assigned image
          backgroundSize: "cover",              // Make image cover entire area
          backgroundPosition: "center",         // Center the image
        }}
      />

      {/* ===== DOCTOR INFORMATION SECTION ===== */}
      <Box p={3}> {/* Padding around content */}

        {/* ===== DOCTOR NAME AND RATING ===== */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Doctor's name */}
          <Typography fontWeight={700} sx={{ color: "#1f2937" }}>
            {doc.name}
          </Typography>

          {/* Star rating display */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,                    // Small gap between star and rating
              background: "#f3f4f6",       // Light gray background
              px: 1,                       // Horizontal padding
              borderRadius: "8px",         // Rounded corners
              fontSize: 12,                // Small text
              color: "#374151",            // Dark gray text
            }}
          >
            <StarIcon sx={{ fontSize: 14, color: "#facc15" }} /> {/* Yellow star */}
            {doc.rating || 4.8} {/* Show rating or default 4.8 */}
          </Box>
        </Stack>

        {/* ===== DOCTOR SPECIALTY ===== */}
        <Typography fontSize={14} mt={0.5} sx={{ color: "#0d6e8a" }}>
          {doc?.department?.name || doc?.specialty || doc?.role || ""}
        </Typography>

        {/* ===== EXPERIENCE AND LOCATION ===== */}
        <Stack spacing={0.8} mt={2}>
          {/* Experience information */}
          <Stack direction="row" spacing={1} alignItems="center">
            <WorkOutlineIcon sx={{ fontSize: 16, color: "#6b7280" }} /> {/* Work icon */}
            <Typography fontSize={13} sx={{ color: "#6b7280" }}>
              {doc.experience || 10} years {/* Show experience or default 10 */}
            </Typography>
          </Stack>

          {/* Location information */}
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon sx={{ fontSize: 16, color: "#6b7280" }} /> {/* Location icon */}
            <Typography fontSize={13} sx={{ color: "#6b7280" }}>
              {doc.location || "Curewell Hospital"} {/* Show location or default */}
            </Typography>
          </Stack>
        </Stack>

        {/* ===== DIVIDER LINE ===== */}
        <Box sx={{
          height: 1,                    // Thin line
          background: "#e5e7eb",        // Light gray color
          my: 2                         // Margin top and bottom
        }} />

        {/* ===== FEES INFORMATION ===== */}
        <Typography fontWeight={600} sx={{ color: "#111827" }}>
          ₹{doc.fees || 500}{" "} {/* Show fees or default 500 */}
          <span style={{ color: "#6b7280" }}>per visit</span> {/* Light gray "per visit" text */}
        </Typography>

        {/* ===== BOOKING BUTTON ===== */}
        <Box
          component="button"  // Use button element for better accessibility
          onClick={() => onOpenModal()} // Call function when clicked
          sx={{
            width: "100%",              // Full width button
            mt: 2,                      // Margin top
            borderRadius: "10px",       // Rounded corners
            py: 1.2,                    // Vertical padding
            background: "linear-gradient(135deg,#0d6e8a,#12343b)", // Blue gradient
            color: "#fff",              // White text
            textTransform: "none",      // No uppercase text
            border: "none",             // Remove default border
            cursor: "pointer",          // Show pointer cursor on hover
            fontSize: "14px",           // Text size
            fontWeight: 500,            // Medium font weight
            "&:hover": {                // Hover effect
              background: "linear-gradient(135deg,#094d63,#0b3746)", // Darker gradient
            },
          }}
        >
          View Profile & Book {/* Button text */}
        </Box>
      </Box>
    </Box>
  );
}