import { useState, useEffect } from "react";

// Type definitions for better code clarity
export interface UsePaginationProps {
  totalItems: number;     // Total number of items to paginate
  itemsPerPage?: number;  // How many items to show per page (default: 6)
  resetOn?: any[];        // When these values change, reset to page 1
}

export interface UsePaginationReturn {
  currentPage: number;                    // Current active page number
  setCurrentPage: (page: number) => void; // Function to change current page
  totalPages: number;                     // Total number of pages available
  startIndex: number;                     // Index where current page starts
  endIndex: number;                       // Index where current page ends
  visibleItems: any[];                    // (Not used - for future expansion)
  goToPage: (page: number) => void;       // Go to specific page number
  nextPage: () => void;                   // Go to next page
  prevPage: () => void;                   // Go to previous page
}

/**
 * Custom hook for handling pagination logic
 *
 * This hook manages:
 * - Current page state
 * - Calculating total pages
 * - Navigation between pages
 * - Auto-scroll to top on page change
 * - Reset to page 1 when filters change
 *
 * @param totalItems - Total number of items to paginate
 * @param itemsPerPage - Number of items per page (default: 6)
 * @param resetOn - Array of values that should reset pagination to page 1
 * @returns Object with pagination state and navigation functions
 */
export function usePagination({
  totalItems,
  itemsPerPage = 6,
  resetOn = []
}: UsePaginationProps): UsePaginationReturn {

  // ===== STATE MANAGEMENT =====
  const [currentPage, setCurrentPage] = useState(1);

  // ===== AUTO-RESET LOGIC =====
  // Reset to page 1 when specified values change (like when filters change)
  useEffect(() => {
    setCurrentPage(1);
  }, resetOn); // Run when any value in resetOn array changes

  // ===== CALCULATIONS =====
  // Calculate total number of pages needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate which items to show on current page
  const startIndex = (currentPage - 1) * itemsPerPage;  // First item index for this page
  const endIndex = startIndex + itemsPerPage;           // Last item index for this page

  // ===== NAVIGATION FUNCTIONS =====

  /**
   * Go to a specific page number
   * Includes validation and smooth scroll to top
   */
  const goToPage = (page: number) => {
    // Only change page if it's within valid range
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Scroll to top of page for better user experience
      window.scrollTo({
        top: 0,
        behavior: "smooth"  // Smooth scrolling animation
      });
    }
  };

  /**
   * Go to the next page (if available)
   */
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  /**
   * Go to the previous page (if available)
   */
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // ===== RETURN PAGINATION OBJECT =====
  return {
    currentPage,        // Which page we're currently on
    setCurrentPage,     // Direct setter (use goToPage instead for validation)
    totalPages,         // Total number of pages
    startIndex,         // Where current page items start
    endIndex,           // Where current page items end
    visibleItems: [],   // Reserved for future use
    goToPage,           // Safe way to change pages
    nextPage,           // Go to next page
    prevPage,           // Go to previous page
  };
}