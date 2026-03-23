// src/components/common/LayoutWrapper.tsx
"use client";

import { Box } from "@mui/material";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { CookiesProvider } from "react-cookie";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <CookiesProvider>
      <Navbar />

      <Box sx={{ minHeight: "80vh", px: 0 }}>
        {children}
      </Box>

      <Footer />
      </CookiesProvider>
    </Box>
  );
}