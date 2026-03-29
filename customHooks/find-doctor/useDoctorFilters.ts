import { useState, useEffect, useMemo } from "react";

// This file contains a custom React hook that handles:
// 1. Search functionality with debouncing
// 2. Department filtering
// 3. Dynamic department list generation
// 4. Smart image assignment to doctors

// Type definitions for better code clarity
export interface UseDoctorFiltersProps {
  doctors: any[]; // Array of doctor objects from API
}

export interface UseDoctorFiltersReturn {
  departmentsList: string[];        // List of available departments for dropdown
  query: string;                    // Current search input value
  setQuery: (query: string) => void; // Function to update search input
  debouncedQuery: string;           // Search value after delay (for API calls)
  department: string;               // Currently selected department filter
  setDepartment: (department: string) => void; // Function to change department filter
  filteredDoctors: any[];           // Doctors after applying filters
  doctorsWithImages: any[];         // Doctors with assigned images
}

/**
 * Custom hook for managing doctor search, filtering, and image assignment
 *
 * This hook handles all the complex logic for:
 * - Searching doctors by name or department
 * - Filtering by department
 * - Automatically generating department options
 * - Assigning images to doctors consistently
 *
 * @param doctors - Array of doctor objects from the API
 * @returns Object containing all filter states and filtered results
 */
export function useDoctorFilters({ doctors }: UseDoctorFiltersProps): UseDoctorFiltersReturn {

  // ===== STATE MANAGEMENT =====
  // These are like variables that can change over time
  const [departmentsList, setDepartmentsList] = useState<string[]>(["All"]);
  const [query, setQuery] = useState("");           // What user types in search box
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Delayed version for API
  const [department, setDepartment] = useState("All"); // Selected department filter

  // ===== SEARCH DEBOUNCING =====
  // This prevents too many API calls while user is typing
  // Waits 500ms after user stops typing before updating search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); // Update search after delay
    }, 500);

    // Cleanup: Cancel timer if user types again
    return () => clearTimeout(timer);
  }, [query]); // Run when search query changes

  // ===== DEPARTMENT LIST GENERATION =====
  // Automatically create dropdown options from available doctors
  useEffect(() => {
    // Use Set to avoid duplicate department names
    const uniqueDepartments = new Set<string>();

    // Loop through each doctor and collect their department names
    (doctors || []).forEach((doctor: any) => {
      // Try different possible field names for department
      const departmentName = doctor?.department?.name ||
                           doctor?.specialty ||
                           doctor?.role;

      // Only add if department name exists
      if (departmentName) {
        uniqueDepartments.add(departmentName);
      }
    });

    // Convert Set to Array and add "All" option at the beginning
    const departmentOptions = ["All", ...Array.from(uniqueDepartments)];

    // Update the dropdown options
    setDepartmentsList(departmentOptions);
  }, [doctors]); // Run when doctors data changes

  // ===== DOCTOR FILTERING =====
  // Apply search and department filters to get final list
  const filteredDoctors = useMemo(() => {
    return (doctors || []).filter((doctor: any) => {
      // ===== DEPARTMENT FILTER =====
      if (department !== "All") {
        // Get doctor's department name (try different field names)
        const doctorDepartment = (doctor?.department?.name ||
                                doctor?.specialty ||
                                doctor?.role || "").toLowerCase();

        // Convert selected department to lowercase for comparison
        const selectedDepartment = department.toLowerCase();

        // If doctor's department doesn't match selected filter, exclude them
        if (doctorDepartment !== selectedDepartment) {
          return false; // Don't include this doctor
        }
      }

      // ===== SEARCH FILTER =====
      if (debouncedQuery && debouncedQuery.trim() !== "") {
        // Convert search query to lowercase for case-insensitive search
        const searchTerm = debouncedQuery.toLowerCase();

        // Search in doctor's name
        const doctorName = (doctor?.name || "").toLowerCase();

        // Search in doctor's department
        const doctorDepartment = (doctor?.department?.name || "").toLowerCase();

        // Include doctor if name OR department contains search term
        const nameMatches = doctorName.includes(searchTerm);
        const departmentMatches = doctorDepartment.includes(searchTerm);

        if (!nameMatches && !departmentMatches) {
          return false; // Don't include this doctor
        }
      }

      // If we get here, doctor passes all filters
      return true; // Include this doctor
    });
  }, [doctors, department, debouncedQuery]); // Recalculate when these change

  // ===== IMAGE ASSIGNMENT =====
  // Available default images for doctors without profile pictures
  const defaultImages = [
    "/img/doctor1.jpg",
    "/img/doctor2.jpg",
    "/img/doctor3.jpg",
  ];

  // ===== SMART IMAGE ASSIGNMENT =====
  // Assign images to doctors with these rules:
  // 1. Use doctor's actual image if available
  // 2. Otherwise assign consistent default images
  // 3. Ensure no two consecutive doctors have the same image
  const doctorsWithImages = useMemo(() => {
    // ===== FIRST PASS: INITIAL IMAGE ASSIGNMENT =====
    const doctorsWithInitialImages = filteredDoctors.map((doctor: any) => {
      // Rule 1: Use doctor's real image if available
      if (doctor?.image || doctor?.img) {
        return {
          ...doctor,                          // Keep all doctor data
          assignedImage: doctor.image || doctor.img  // Use their real image
        };
      }

      // Rule 2: Assign consistent default image based on doctor ID
      // This ensures same doctor always gets same image
      const doctorIdentifier = doctor?.id ?? doctor?._id ?? doctor?.name ?? Math.random();

      // Create a simple hash from the identifier
      const hashValue = String(doctorIdentifier)
        .split('')                                    // Split into characters
        .reduce((sum, char) => sum + char.charCodeAt(0), 0); // Sum character codes

      // Use hash to pick consistent image
      const imageIndex = hashValue % defaultImages.length;
      const assignedImage = defaultImages[imageIndex];

      return {
        ...doctor,                    // Keep all doctor data
        assignedImage,                // Add assigned image
        stableHash: hashValue         // Store hash for next step
      };
    });

    // ===== SECOND PASS: PREVENT CONSECUTIVE DUPLICATES =====
    return doctorsWithInitialImages.map((doctor, currentIndex, doctorArray) => {
      // Skip doctors who already have real images
      if (doctor?.image || doctor?.img) {
        return doctor; // Keep as-is
      }

      // Start with the initially assigned image
      let finalImageIndex = doctor.stableHash % defaultImages.length;

      // Check if previous doctor has the same image
      if (currentIndex > 0) {
        const previousDoctor = doctorArray[currentIndex - 1];
        const previousImage = previousDoctor.assignedImage;
        const currentImage = defaultImages[finalImageIndex];

        // If same as previous, use next image in rotation
        if (previousImage === currentImage) {
          finalImageIndex = (finalImageIndex + 1) % defaultImages.length;
        }
      }

      // Return doctor with final image assignment
      return {
        ...doctor,
        assignedImage: defaultImages[finalImageIndex]
      };
    });
  }, [filteredDoctors]); // Recalculate when filtered doctors change

  // ===== RETURN ALL VALUES =====
  // This is what other components can use from this hook
  return {
    departmentsList,     // ["All", "Cardiology", "Neurology", ...]
    query,              // Current search text
    setQuery,           // Function to update search
    debouncedQuery,     // Search text after delay
    department,         // Current department filter
    setDepartment,      // Function to change department filter
    filteredDoctors,    // Doctors after filtering
    doctorsWithImages,  // Doctors with images assigned
  };
}