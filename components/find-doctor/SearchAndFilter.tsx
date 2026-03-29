"use client";

import React from "react";
import {
  Box,
  TextField,
  Stack,
  MenuItem,
} from "@mui/material";

// ===== TYPE DEFINITIONS =====
/**
 * Props for the SearchAndFilter component
 */
interface SearchAndFilterProps {
  query: string;                    // Current search query text
  setQuery: (query: string) => void; // Function to update search query
  department: string;               // Currently selected department filter
  setDepartment: (department: string) => void; // Function to update department filter
  departmentsList: string[];        // Array of available department options
}

/**
 * SearchAndFilter Component
 *
 * Provides search input and department filter dropdown for finding doctors.
 * This component handles user input for filtering the doctor list.
 *
 * @param query - Current search text entered by user
 * @param setQuery - Function to update the search query state
 * @param department - Currently selected department filter
 * @param setDepartment - Function to update the department filter state
 * @param departmentsList - List of all available departments for the dropdown
 */
export default function SearchAndFilter({
  query,
  setQuery,
  department,
  setDepartment,
  departmentsList,
}: SearchAndFilterProps) {
  return (
    // ===== MAIN CONTAINER =====
    // Stack component arranges children horizontally on medium+ screens, vertically on mobile
    <Stack
      direction={{ xs: "column", md: "row" }}  // Column on small screens, row on medium+
      spacing={2}                              // 16px gap between children
      mb={4}                                   // 32px margin bottom
    >
      {/* ===== SEARCH INPUT FIELD ===== */}
      <Box
        sx={{
          flex: 1,                             // Take up remaining space (grow to fill)
          display: "flex",                     // Flexbox for centering content
          alignItems: "center",                // Center items vertically
          background: "#f1f3f5",               // Light gray background
          borderRadius: "50px",                // Fully rounded corners
          px: 2,                               // 16px horizontal padding
          height: 50,                          // Fixed height for consistent look
        }}
      >
        {/* TextField for search input */}
        <TextField
          fullWidth                            // Take full width of parent
          placeholder="Search doctor..."       // Placeholder text when empty
          variant="standard"                   // Minimal styling variant
          value={query}                        // Controlled value from props
          onChange={(e) => setQuery(e.target.value)} // Update query on user input
          InputProps={{
            disableUnderline: true             // Remove default underline
          }}
        />
      </Box>

      {/* ===== DEPARTMENT FILTER DROPDOWN ===== */}
      <TextField
        select                               // Makes it a dropdown/select field
        value={department}                   // Controlled value from props
        onChange={(e) => setDepartment(e.target.value)} // Update department on selection
        variant="standard"                   // Minimal styling variant
        InputProps={{
          disableUnderline: true             // Remove default underline
        }}
        sx={{
          minWidth: 220,                     // Minimum width for dropdown
          background: "#f1f3f5",             // Light gray background to match search
          borderRadius: "50px",              // Fully rounded corners
          px: 2,                             // 16px horizontal padding
          height: 50,                        // Fixed height to match search input
        }}
      >
        {/* ===== DROPDOWN MENU ITEMS ===== */}
        {/* Map through departmentsList to create menu options */}
        {departmentsList.map((dep) => (
          <MenuItem key={dep} value={dep}>
            {dep} {/* Display department name as option text */}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}