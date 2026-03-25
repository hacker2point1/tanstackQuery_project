"use client";

import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useDoctorSlots } from "@/customHooks/query/doctor.query.hooks";

export default function SlotPicker({ doctorId, date, value, onChange }: { doctorId: string; date: string; value: string; onChange: (t: string) => void; }) {
  const q = useDoctorSlots(doctorId, date as any);
  const loading = q.isLoading;
  const slots = q.data?.data || q.data || [];

  if (loading) return <Typography>Loading slots...</Typography>;

  if (!Array.isArray(slots) || slots.length === 0) return <Typography>No available slots for selected date.</Typography>;

  const normalizeTime = (time: string) => {
    // Convert am/pm casing to uppercase with normalized spacing
    return time
      .trim()
      .replace(/\s+/g, " ")
      .replace(/(am|pm)$/i, (m) => m.toUpperCase());
  };

  const uniqueSlotTimes = Array.from(
    new Set(
      slots
        .map((s: any) => s.time || s.slot || s)
        .filter((slot: any): slot is string => typeof slot === "string" && slot.trim().length > 0)
        .map((slot) => normalizeTime(slot))
    )
  );

  return (
    <Box>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, rowGap: 1 }}>
        {uniqueSlotTimes.map((time: string, idx: number) => {
          const selected = value === time;
          return (
            <Button
              key={`${time}-${idx}`}
              variant="contained"
              onClick={() => onChange(time)}
              sx={{
                minWidth: 96,
                minHeight: 36,
                color: selected ? "#fff" : "#1a2327",
                backgroundColor: selected ? "#00A76F" : "#fff",
                border: selected ? "1px solid #00A76F" : "1px solid #d0d7df",
                borderRadius: 2,
                textTransform: "none",
                fontSize: 13,
                boxShadow: selected ? "0 4px 12px rgba(0, 167, 111, 0.25)" : "none",
                transition: "all 0.2s ease",
                px: 1.5,
                py: 1,
                '&:hover': {
                  backgroundColor: selected ? "#009167" : "#f3f5f7",
                  borderColor: selected ? "#00805c" : "#b1b7c3",
                },
              }}
            >
              {time}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
