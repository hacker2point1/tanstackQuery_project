// src/components/common/LayoutWrapper.tsx
"use client";

import { Box } from "@mui/material";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { CookiesProvider } from "react-cookie";
import { usePathname } from "next/navigation";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname?.startsWith("/auth/reset-password") || false;

  return (
    <Box>
      <CookiesProvider>
        {!hideNavbar && <Navbar />}

        <Box sx={{ minHeight: "80vh", px: 0 }}>{children}</Box>

        <Footer />
      </CookiesProvider>
    </Box>
  );
}