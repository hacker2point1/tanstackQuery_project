"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Stack,
  Chip,
  Divider,
  Pagination,
  Skeleton,
  Paper,
} from "@mui/material";

import useUserHistory from "@/customHooks/query/history.query.hooks";

const ITEMS_PER_PAGE = 6;

export default function HistoryPage() {
  const { data, isLoading, isError, error } = useUserHistory();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const payload = data?.data ?? data;
  const history = Array.isArray(payload) ? payload : payload?.data ?? [];

  const filteredData = history.filter((item: any) => {
    const st = (item.status || "").toLowerCase();

    if (filter === "upcoming")
      return st.includes("pending") || st.includes("confirm") || st.includes("accept");

    if (filter === "completed")
      return st.includes("complete") || st.includes("done");

    if (filter === "cancelled")
      return st.includes("reject") || st.includes("cancel") || st.includes("declin");

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 2 }}>
        <Stack spacing={2}>
          {Array.from(new Array(6)).map((_, i) => (
            <Paper key={i} sx={{ p: 3, borderRadius: 4 }}>
              <Skeleton height={20} width="40%" />
              <Skeleton height={16} width="60%" sx={{ mt: 1 }} />
              <Skeleton height={16} width="80%" sx={{ mt: 1 }} />
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 720, mx: "auto", mt: 8 }}>
        <Alert severity="error">
          {(error as any)?.message || "Failed to load history."}
        </Alert>
      </Box>
    );
  }

  const getCount = (type: string) => {
    return history.filter((item: any) => {
      const st = (item.status || "").toLowerCase();

      if (type === "upcoming")
        return st.includes("pending") || st.includes("confirm") || st.includes("accept");

      if (type === "completed")
        return st.includes("complete") || st.includes("done");

      if (type === "cancelled")
        return st.includes("reject") || st.includes("cancel") || st.includes("declin");

      return true;
    }).length;
  };

  const filters = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const activeIndex = filters.findIndex((f) => f.value === filter);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 2 }}>
      
      {/* header */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        My Appointments
      </Typography>

      {/* filter bar */}

<Box sx={{ position: "relative", mb: 4 }}>
  <Box
    sx={{
      display: "flex",
      position: "relative",
      width: "100%", 
      p: 0.5,
      borderRadius: "999px",
      background: "#eef2f6",
    }}
  >
    {/* Sliding Indicator */}
    <Box
      sx={{
        position: "absolute",
        top: 4,
        bottom: 4,
        left: `${activeIndex * 25}%`,
        width: "25%",
        borderRadius: "999px",
        background: "linear-gradient(135deg,#0d6e8a,#12343b)",
        transition: "all 0.3s ease",
      }}
    />

    {filters.map((item) => {
      const active = filter === item.value;
      const count = getCount(item.value);

      return (
        <Box
          key={item.value}
          onClick={() => {
            setFilter(item.value);
            setPage(1);
          }}
          sx={{
            flex: 1, 
            zIndex: 2,
            py: 1,
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: active ? "#fff" : "#374151",
            transition: "0.3s",
          }}
        >
          {item.label}

          <Box
            sx={{
              px: 1,
              py: "2px",
              borderRadius: "999px",
              fontSize: 12,
              fontWeight: 600,
              background: active
                ? "rgba(255,255,255,0.2)"
                : "#dfe3e8",
              color: active ? "#fff" : "#374151",
            }}
          >
            {count}
          </Box>
        </Box>
      );
    })}
  </Box>
</Box>

      {/* empty-data */}
      {filteredData.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            borderRadius: 4,
            background: "#f9fafb",
            border: "1px dashed #e5e7eb",
          }}
        >
          <Typography variant="h6" sx={{ color: "#111827" }}>
            No appointments found
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            No data available for this filter.
          </Typography>
        </Box>
      )}

      {/* list */}
      <Stack spacing={2}>
        {paginatedData.map((item: any) => {
          const doctor = item?.doctorId || {};
          const st = (item.status || "").toLowerCase().trim();

          let chipColor: any = "default";
          if (st.includes("confirm") || st.includes("accept")) chipColor = "success";
          else if (st.includes("reject") || st.includes("declin")) chipColor = "error";
          else if (st.includes("pend")) chipColor = "warning";

          return (
            <Paper
              key={item._id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#ffffff",
                border: "1px solid #f1f5f9",
                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Stack spacing={1.2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600} sx={{ color: "#111827" }}>
                    {doctor.name || "Unknown Doctor"}
                  </Typography>

                  <Chip
                    label={item.status || "-"}
                    color={chipColor}
                    size="small"
                  />
                </Stack>

                <Typography fontSize={14} sx={{ color: "#4b5563" }}>
                  {item.date} • {item.time}
                </Typography>

                <Typography fontSize={14} sx={{ color: "#6b7280" }}>
                  📍 {item?.address || "No address"}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography fontWeight={600} sx={{ color: "#0d6e8a" }}>
                  ₹{doctor.fees ?? "-"}
                </Typography>
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      {/* pagination */}
      {filteredData.length > ITEMS_PER_PAGE && (
        <Stack alignItems="center" mt={5}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  );
}


