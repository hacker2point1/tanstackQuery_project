"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

import useUserProfile from "@/customHooks/query/profile.query.hooks";

export default function ProfilePage() {
  const { data, isLoading, isError, error } = useUserProfile();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 720, mx: "auto", mt: 8 }}>
        <Alert severity="error">
          {(error as any)?.message || "Failed to load profile."}
        </Alert>
      </Box>
    );
  }

  const profile = data?.data ?? data;

  const displayName =
    profile?.name ||
    profile?.fullName ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    "-";

  const displayEmail =
    profile?.email || profile?.email_address || "-";

  const displayAddress =
    profile?.address || profile?.location || "-";

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 8, px: 2 }}>
      
      {/* HEADER */}
      <Card
        sx={{
          p: 4,
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          mb: 4,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: 28,
              background: "linear-gradient(135deg,#0d6e8a,#12343b)",
            }}
          >
            {displayName?.charAt(0) || "U"}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#1f2937" }}>
              {displayName}
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              {displayEmail}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* DETAILS */}
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Typography variant="h6" mb={2}>
            Personal Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            {/* NAME */}
            <Box>
              <Typography fontSize={14} color="#6b7280">
                Name
              </Typography>
              <Typography fontWeight={500} sx={{ color: "#111827" }}>
                {displayName}
              </Typography>
            </Box>

            {/* EMAIL */}
            <Box>
              <Typography fontSize={14} color="#6b7280">
                Email
              </Typography>
              <Typography fontWeight={500} sx={{ color: "#111827" }}>
                {displayEmail}
              </Typography>
            </Box>

            {/* ADDRESS */}
            <Box>
              <Typography fontSize={14} color="#6b7280">
                Address
              </Typography>
              <Typography fontWeight={500} sx={{ color: "#111827" }}>
                {displayAddress}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}