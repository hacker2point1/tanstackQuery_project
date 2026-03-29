"use client";

import React from "react";
import {
  Box,
  Pagination,
} from "@mui/material";

// ===== TYPE DEFINITIONS =====
/**
 * Props for the DoctorPagination component
 */
interface DoctorPaginationProps {
  totalPages: number;              // Total number of pages available
  currentPage: number;             // Current active page number (1-based)
  onPageChange: (page: number) => void; // Function called when user changes page
}

/**
 * DoctorPagination Component
 *
 * Displays pagination controls for navigating through doctor search results.
 * Only shows when there are multiple pages (totalPages > 1).
 * Uses Material-UI Pagination component with custom styling.
 *
 * @param totalPages - Total number of pages in the results
 * @param currentPage - The currently active page (starts from 1)
 * @param onPageChange - Callback function when user clicks a page number
 */
export default function DoctorPagination({
  totalPages,
  currentPage,
  onPageChange,
}: DoctorPaginationProps) {
  // ===== EARLY RETURN FOR SINGLE PAGE =====
  // If there's only 1 page or less, don't show pagination controls
  if (totalPages <= 1) return null;

  return (
    // ===== MAIN CONTAINER =====
    <Box
      display="flex"                    // Use flexbox layout
      justifyContent="center"           // Center the pagination horizontally
      mt={6}                            // 48px margin top for spacing
    >
      {/* ===== MATERIAL-UI PAGINATION COMPONENT ===== */}
      <Pagination
        count={totalPages}              // Total number of pages to display
        page={currentPage}              // Current active page (1-based)
        onChange={(event, page) => onPageChange(page)} // Handle page change
        color="primary"                 // Use primary color theme
        size="large"                    // Larger size for better usability
        sx={{
          // ===== CUSTOM STYLING =====
          // Style for all pagination items (page numbers, arrows)
          "& .MuiPaginationItem-root": {
            color: "#0d6e8a",           // Blue text color
            borderColor: "#0d6e8a",     // Blue border
            "&:hover": {               // Hover effect
              backgroundColor: "rgba(13, 110, 138, 0.1)", // Light blue background
            },
          },
          // Style for the currently selected page
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#0d6e8a", // Solid blue background
            color: "#fff",             // White text
            "&:hover": {               // Darker blue on hover
              backgroundColor: "#094d63",
            },
          },
        }}
      />
    </Box>
  );
}