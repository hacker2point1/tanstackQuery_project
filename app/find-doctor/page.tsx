"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  MenuItem,
  Pagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import {
  useDoctorList,
  useDoctorAppoinment,
} from "@/customHooks/query/doctor.query.hooks";
import getProfile from "@/api/functions/profile.api";
import AppointmentModal from "@/components/modals/appointmentModal/appointmentModal";
import { toast } from "sonner";

/*doctors-card */
function DoctorCard({
  doc,
  onOpenModal,
}: {
  doc: any;
  onOpenModal: (slot?: { date?: string; time?: string }) => void;
}) {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-6px)" },
      }}
    >
      <Box
        sx={{
          height: 220,
          backgroundImage: `url(${doc.assignedImage || "/img/doctor1.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box p={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={700} sx={{ color: "#1f2937" }}>
            {doc.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              background: "#f3f4f6",
              px: 1,
              borderRadius: "8px",
              fontSize: 12,
              color: "#374151",
            }}
          >
            <StarIcon sx={{ fontSize: 14, color: "#facc15" }} />
            {doc.rating || 4.8}
          </Box>
        </Stack>

        <Typography fontSize={14} mt={0.5} sx={{ color: "#0d6e8a" }}>
          {doc?.department?.name || doc?.specialty || doc?.role || ""}
        </Typography>

        <Stack spacing={0.8} mt={2}>
          <Stack direction="row" spacing={1}>
            <WorkOutlineIcon sx={{ fontSize: 16, color: "#6b7280" }} />
            <Typography fontSize={13} sx={{ color: "#6b7280" }}>
              {doc.experience || 10} years
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <LocationOnIcon sx={{ fontSize: 16, color: "#6b7280" }} />
            <Typography fontSize={13} sx={{ color: "#6b7280" }}>
              {doc.location || "Curewell Hospital"}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ height: 1, background: "#e5e7eb", my: 2 }} />

        <Typography fontWeight={600} sx={{ color: "#111827" }}>
          ₹{doc.fees || 500}{" "}
          <span style={{ color: "#6b7280" }}>per visit</span>
        </Typography>

        <Button
          fullWidth
          sx={{
            mt: 2,
            borderRadius: "10px",
            py: 1.2,
            background: "linear-gradient(135deg,#0d6e8a,#12343b)",
            color: "#fff",
            textTransform: "none",
          }}
          onClick={() => onOpenModal()}
        >
          View Profile & Book
        </Button>
      </Box>
    </Box>
  );
}

/* main-page */
export default function FindDoctorPage() {
  const [departmentsList, setDepartmentsList] = useState<string[]>(["All"]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const bookMutation = useDoctorAppoinment();
  const { data: res, isLoading } = useDoctorList({
    search: debouncedQuery,
    department: department === "All" ? "" : department,
    page: 1,
    limit: 1000,
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, department]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  const doctors = (((res as any)?.data?.doctors) ?? ((res as any)?.doctors) ?? ((res as any)?.data) ?? []) as any[];

  useEffect(() => {
    const setNames = new Set<string>();
    (doctors || []).forEach((doc: any) => {
      const name = doc?.department?.name || doc?.specialty || doc?.role;
      if (name) setNames.add(name);
    });
    setDepartmentsList(["All", ...Array.from(setNames)]);
  }, [res]);

  const filteredDoctors = (doctors || []).filter((doc: any) => {
    // department filter
    if (department !== "All") {
      const depName = (doc?.department?.name || doc?.specialty || doc?.role || "").toLowerCase();
      if (depName !== department.toLowerCase()) return false;
    }

    // search filter
    if (debouncedQuery && debouncedQuery.trim() !== "") {
      const q = debouncedQuery.toLowerCase();
      const name = (doc?.name || "").toLowerCase();
      const dep = (doc?.department?.name || "").toLowerCase();
      return name.includes(q) || dep.includes(q);
    }

    return true;
  });

  // Available doctor images for random assignment
  const defaultImages = [
    "/img/doctor1.jpg",
    "/img/doctor2.jpg",
    "/img/doctor3.jpg",
  ];

  // Assign images to doctors, ensuring no consecutive cards have the same image
  const doctorsWithImages = useMemo(() => {
    return filteredDoctors.map((doc: any) => {
      // Use API image if available, otherwise assign from default images
      if (doc?.image || doc?.img) {
        return { ...doc, assignedImage: doc.image || doc.img };
      }
      
      // Use a stable identifier (doctor ID) to ensure consistent image assignment
      const stableId = doc?.id ?? doc?._id ?? doc?.name ?? Math.random();
      const hash = String(stableId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return { ...doc, assignedImage: defaultImages[hash % defaultImages.length], stableHash: hash };
    }).map((doc, index, array) => {
      // Ensure no consecutive cards have the same image
      if (doc?.image || doc?.img) return doc; // Skip API images
      
      let imageIndex = doc.stableHash % defaultImages.length;
      
      // Check if previous doctor has the same image
      if (index > 0) {
        const prevImage = array[index - 1].assignedImage;
        if (prevImage === defaultImages[imageIndex]) {
          // Use next image to avoid consecutive duplicates
          imageIndex = (imageIndex + 1) % defaultImages.length;
        }
      }
      
      return { ...doc, assignedImage: defaultImages[imageIndex] };
    });
  }, [filteredDoctors]);

  // Calculate pagination
  const totalPages = Math.ceil(doctorsWithImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleDoctors = doctorsWithImages.slice(startIndex, endIndex);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* search-space */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          mb={4}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#f1f3f5",
              borderRadius: "50px",
              px: 2,
              height: 50,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search doctor..."
              variant="standard"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
          </Box>

          <TextField
            select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{
              minWidth: 220,
              background: "#f1f3f5",
              borderRadius: "50px",
              px: 2,
              height: 50,
            }}
          >
            {departmentsList.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* loading-state */}
        {isLoading && (
          <Box textAlign="center" py={6}>
            <CircularProgress />
          </Box>
        )}

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {visibleDoctors.map((doc: any, i: number) => (
            <DoctorCard
              key={doc.id ?? doc._id ?? i}
              doc={doc}
              onOpenModal={() => {
                setSelectedDoctorId(doc.id ?? doc._id ?? null);
                setSelectedDoctor(doc);
                setOpenModal(true);
              }}
            />
          ))}
        </Box>

        {/* pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={6}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#0d6e8a",
                  borderColor: "#0d6e8a",
                  "&:hover": {
                    backgroundColor: "rgba(13, 110, 138, 0.1)",
                  },
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#0d6e8a",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#094d63",
                  },
                },
              }}
            />
          </Box>
        )}

        {/* modals */}
        <AppointmentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          doctorId={selectedDoctorId}
          doctor={selectedDoctor}
          cardImage={selectedDoctor?.assignedImage}
          onSubmit={async ({ date, time, name }) => {
            if (!selectedDoctorId) return;

            let userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

            if (!userId) {
              
              try {
                const profiles = await getProfile();
                const profile = profiles?.data ?? profiles;
                userId = profile?._id || profile?.id || null;
                if (userId && typeof window !== "undefined") localStorage.setItem("userId", userId);
              } catch (e) {
                console.log(e)
              }
            }

            if (!userId) {
              toast.error("Please sign in");
              return;
            }

            return new Promise<void>((resolve) => {
              bookMutation.mutate(
                { doctorId: selectedDoctorId, userId, date, time, name },
                {
                  onSuccess: () => {
                    setOpenModal(false);
                    resolve();
                  },
                  onError: () => resolve(),
                }
              );
            });
          }}
        />
      </Box>
    </Box>
  );
}


