//api handeled card
"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDoctorList } from "@/customHooks/query/doctor.query.hooks";

// fallback static data when API doesn't return items
const fallbackDoctors = [
  { id: 1, name: "Dr. John Doe", role: "Cardiologist", img: "/img/doctor1.jpg" },
  { id: 2, name: "Dr. Sarah Smith", role: "Neurologist", img: "/img/doctor2.jpg" },
  { id: 3, name: "Dr. Alex Brown", role: "Orthopedic", img: "/img/doctor3.jpg" },
];

const item: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    } as any,
  },
};

const TeamSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";


  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | string | null>(null);
  const router = useRouter();

  // fetch top 3 experts dynamically
  const { data: res, isLoading } = useDoctorList({ page: 1, limit: 3 });
  const doctors = (((res as any)?.data?.doctors) ?? ((res as any)?.doctors) ?? ((res as any)?.data) ?? fallbackDoctors) as any[];
  const displayDoctors = Array.isArray(doctors) ? doctors.slice(0, 3) : fallbackDoctors;

  const defaultImages = [
    "/img/doctor1.jpg",
    "/img/doctor2.jpg",
    "/img/doctor3.jpg",
  ];

  // assign an image per displayed doctor (useMemo to keep stable during renders)
  const assignedImages = useMemo(() => {
    return displayDoctors.map((doc) => {
      if (doc?.img) return doc.img;
      if (doc?.image) return doc.image;
      // pick a pseudo-random image using doc id when available, else random
      const seed = doc?.id ?? doc?._id ?? Math.floor(Math.random() * 1000);
      const idx = Math.abs(String(seed).split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % defaultImages.length;
      return defaultImages[idx];
    });
  }, [displayDoctors]);


  const bookingMutation = useMutation({
    mutationFn: async (doctorId: number) => {
      setLoadingId(doctorId);

      return new Promise((resolve) =>
        setTimeout(() => resolve(true), 1000)
      );
    },
    onSettled: () => {
      setLoadingId(null); //reset succes-error
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 10, md: 14 },
        px: { xs: 2, md: 6 },
        background: isDark
          ? "linear-gradient(180deg, #070F22 0%, #0B1736 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f4f9fc 100%)",
      }}
    >
      <Typography
        fontSize={{ xs: 28, md: 42 }}
        fontWeight={800}
        textAlign="center"
        mb={8}
        sx={{
          background: "linear-gradient(90deg,#1878A2,#E780A9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Our Experts
      </Typography>

      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          gap: { xs: 3, md: 4 },
          overflowX: { xs: "auto", md: "hidden" },
          flexWrap: "nowrap",
          px: { xs: 1, md: 0 },
          alignItems: "stretch",
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        {displayDoctors.map((doc, idx) => (
          <Box
            key={doc.id ?? doc._id ?? idx}
            sx={{
              flex: { xs: '0 0 80%', md: '0 0 calc((100% - 32px) / 3)' },
              maxWidth: { xs: '80%', md: 'calc((100% - 32px) / 3)' },
              minWidth: { xs: '260px', md: '0' },
            }}
          >
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.95)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                {/* image-place */}
                <Box
                  sx={{
                    height: 280,
                    backgroundImage: `url(${assignedImages[idx]})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                  }}
                />

                {/* content */}
                <Box p={3} textAlign="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography fontWeight={700} color="#12343b">
                      {doc.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        background: '#f3f4f6',
                        px: 1,
                        borderRadius: '8px',
                        fontSize: 12,
                        color: '#374151',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 14, color: '#facc15' }} />
                      4.8
                    </Box>
                  </Box>

                  <Typography color="#5f7c80" fontSize={14}>
                    {doc?.department?.name || doc?.specialty || doc?.role || ''}
                  </Typography>

                  <Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <WorkOutlineIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                      <Typography fontSize={13} sx={{ color: '#6b7280' }}>
                        {doc.experience || 10} years
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    onClick={() => {
                      if (clickedId === (doc.id ?? doc._id)) return;
                      setClickedId(doc.id ?? doc._id ?? null);
                      router.push(`/find-doctor?doctorId=${doc.id ?? doc._id ?? ""}`);
                    }}
                    disabled={loadingId === doc.id || clickedId === (doc.id ?? doc._id)}
                    sx={{
                      mt: 2.5,
                      borderRadius: "999px",
                      py: 1,
                      background:
                        "linear-gradient(135deg,#1878A2,#E780A9)",
                      color: "#fff",
                    }}
                  >
                    {clickedId === (doc.id ?? doc._id) ? "Opening..." : loadingId === doc.id ? "Booking..." : "Book Now"}
                  </Button>
                </Box>

                <Box
                  sx={{
                    height: "4px",
                    background:
                      "linear-gradient(90deg,#1878A2,#E780A9)",
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={4}>
        <Button
          component={Link}
          href="/find-doctor"
          variant="contained"
          disableElevation
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: "linear-gradient(135deg,#0d6e8a,#12343b)",
            color: "#fff",
            textTransform: "none",
            '&:hover': { background: 'linear-gradient(135deg,#094d63,#0b3746)' },
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export default TeamSection;


