"use client";

import React, { useState } from "react";
import SlotPicker from "./slotPicker";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";

export default function AppointmentModal({
  open,
  onClose,
  onSubmit,
  defaultName = "",
  defaultDate = "",
  defaultTime = "",
  doctorId,
  doctor,
  cardImage,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { date: string; time: string; name: string }) => void;
  defaultName?: string;
  defaultDate?: string;
  defaultTime?: string;
  doctorId?: string | null;
  doctor?: any | null;
  cardImage?: string;
}) {
  const [date, setDate] = useState<string>(defaultDate || "");
  const [time, setTime] = useState<string>(defaultTime || "");
  const [name, setName] = useState<string>(defaultName);
  const [submitting, setSubmitting] = useState(false);

  // Use the same image as shown on the card
  const modalImage = cardImage || doctor?.image || doctor?.img || "/img/doctor1.jpg";

  React.useEffect(() => {
    if (open) {
      setName(defaultName || "");
      setDate(defaultDate || "");
      setTime(defaultTime || "");
    }
  }, [open, defaultName, defaultDate, defaultTime]);

  const handleSubmit = async () => {
    if (!date || !time || !name) return;
    setSubmitting(true);
    try {
      await onSubmit({ date, time, name });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              flex: 1.2,
              p: 4,
              backgroundColor: "#f9fafb",
            }}
          >
            {doctor && (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    overflow: "hidden",
                    background: "#f3f4f6",
                  }}
                >
                  <img
                    src={modalImage}
                    alt={doctor.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontWeight={700}>{doctor.name}</Typography>
                  <Typography fontSize={13} sx={{ color: "#6b7280" }}>
                    {doctor?.department?.name ||
                      doctor?.specialty ||
                      doctor?.role ||
                      ""}
                  </Typography>
                  <Typography fontSize={13} sx={{ color: "#0d6e8a" }}>
                    ₹{doctor.fees || 500} per visit
                  </Typography>
                </Box>
              </Stack>
            )}

            <Box
              component="img"
              src={modalImage}
              alt="Doctor"
              sx={{
                width: "100%",
                height: 240,
                objectFit: "cover",
                borderRadius: "16px",
                mb: 3,
              }}
            />

            <Typography fontSize={22} fontWeight={700}>
              {doctor?.name || "Dr. Sarah Johnson"}
            </Typography>

            <Typography color="#666" mb={2}>
              {doctor?.department?.name || doctor?.specialty || doctor?.role || "Cardiologist"}
            </Typography>

            <Stack spacing={1.5} color="#555">
              <Typography>🗓 {doctor?.experience || 15} years of experience</Typography>
              <Typography>🎓 {doctor?.qualification || "MD from Harvard Medical School"}</Typography>
              <Typography>📍 {doctor?.location || "New York Medical Center"}</Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={600} mb={1}>
              About
            </Typography>

            <Typography color="#666">
              {doctor?.about || "Specialized in preventive cardiology and heart disease management with over 15 years of experience."}
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Typography fontWeight={700} fontSize={20} mb={3}>
              Book Appointment
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <TextField
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              {doctorId && date ? (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #eee",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <SlotPicker
                    doctorId={doctorId}
                    date={date}
                    value={time}
                    onChange={(t: string) => setTime(t)}
                  />
                </Box>
              ) : (
                <TextField
                  type="time"
                  label="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              )}

             
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!date || !time || !name || submitting}
                sx={{
                  mt: 2,
                  height: 48,
                  borderRadius: "12px",
                  backgroundColor: "#000",
                  color: "#ffffff",
                  fontWeight: 600,
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#1c1c1c",
                  },

                  "&.Mui-disabled": {
                    backgroundColor: "#ccc",
                    color: "#666",
                  },
                }}
              >
                {submitting ? "Booking..." : "Book Appointment"}
              </Button>

              <Button
                onClick={onClose}
                sx={{
                  textTransform: "none",
                  color: "#666",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

