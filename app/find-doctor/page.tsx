"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  MenuItem,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import {
  useDoctorListMutation,
  useDoctorAppoinment,
} from "@/customHooks/query/doctor.query.hooks";
import getProfile from "@/api/functions/profile.api";
import AppointmentModal from "@/components/modals/appointmentModal/appointmentModal";
import { toast } from "sonner";

/* ================= DOCTOR CARD ================= */
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
          backgroundImage: `url(${doc.image || "/img/doctor1.jpg"})`,
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

/* ================= MAIN PAGE ================= */
export default function FindDoctorPage() {
  const [departmentsList, setDepartmentsList] = useState<string[]>(["All"]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [fees, setFees] = useState<number[]>([0, 2000]);

  const [visibleCount, setVisibleCount] = useState(6); // ✅ 2 rows

  const mutation = useDoctorListMutation();
  const bookMutation = useDoctorAppoinment();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    mutation.mutate({
      search: debouncedQuery,
      department: department === "All" ? "" : department,
      minFees: fees[0],
      maxFees: fees[1],
      page: 1,
      limit: 1000, // 🔥 get all once
    });
  }, [debouncedQuery, department, fees]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  const res = mutation.data;
  const doctors = res?.data?.doctors || res?.doctors || res?.data || [];

  useEffect(() => {
    const setNames = new Set<string>();
    (doctors || []).forEach((doc: any) => {
      const name = doc?.department?.name || doc?.specialty || doc?.role;
      if (name) setNames.add(name);
    });
    setDepartmentsList(["All", ...Array.from(setNames)]);
  }, [res]);

  const filteredDoctors = doctors.filter((doc: any) => {
    if (department === "All") return true;
    const n =
      doc?.department?.name || doc?.specialty || doc?.role || "";
    return n.toLowerCase() === department.toLowerCase();
  });

  const visibleDoctors = filteredDoctors.slice(0, visibleCount);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* SEARCH */}
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

        {/* LOADING */}
        {mutation.isLoading && (
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

        {/* VIEW MORE BUTTON */}
        {visibleCount < filteredDoctors.length && (
          <Box textAlign="center" mt={5}>
            <Button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "999px",
                background: "#0d6e8a",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  background: "#094d63",
                },
              }}
            >
              View More
            </Button>
          </Box>
        )}

        {/* MODAL */}
        <AppointmentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          doctorId={selectedDoctorId}
          doctor={selectedDoctor}
          onSubmit={async ({ date, time, name }) => {
            if (!selectedDoctorId) return;

            let userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

            if (!userId) {
              // try to fetch profile to derive userId if token exists
              try {
                const p = await getProfile();
                const profile = p?.data ?? p;
                userId = profile?._id || profile?.id || null;
                if (userId && typeof window !== "undefined") localStorage.setItem("userId", userId);
              } catch (e) {
                // ignore
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



// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Stack,
//   MenuItem,
//   Pagination,
// } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

// import { useDoctorListMutation, useDoctorAppoinment } from "@/customHooks/query/doctor.query.hooks";
// import AppointmentModal from "@/components/modals/appointmentModal/appointmentModal";
// import { toast } from "sonner";

// // Small card component so hooks can be used per-card
// function DoctorCard({ doc, onOpenModal }: { doc: any; onOpenModal: (slot?: { date?: string; time?: string }) => void }) {
//   const idToSend = doc.id ?? doc._id ?? doc.doctorId;

//   return (
//     <Box
//       sx={{
//         borderRadius: "20px",
//         overflow: "hidden",
//         background: "#fff",
//         boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
//         transition: "0.3s",
//         "&:hover": { transform: "translateY(-6px)" },
//       }}
//     >
//       <Box
//         sx={{
//           height: 220,
//           backgroundImage: `url(${doc.image || "/img/doctor1.jpg"})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />

//       <Box p={3}>
//         <Stack direction="row" justifyContent="space-between">
//           <Typography fontWeight={700} sx={{ color: "#1f2937" }}>
//             {doc.name}
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               background: "#f3f4f6",
//               px: 1,
//               borderRadius: "8px",
//               fontSize: 12,
//               color: "#374151",
//             }}
//           >
//             <StarIcon sx={{ fontSize: 14, color: "#facc15" }} />
//             {doc.rating || 4.8}
//           </Box>
//         </Stack>

//         <Typography fontSize={14} mt={0.5} sx={{ color: "#0d6e8a" }}>
//           {doc?.department?.name || doc?.specialty || doc?.role || ""}
//         </Typography>

//         <Stack spacing={0.8} mt={2}>
//           <Stack direction="row" spacing={1}>
//             <WorkOutlineIcon sx={{ fontSize: 16, color: "#6b7280" }} />
//             <Typography fontSize={13} sx={{ color: "#6b7280" }}>
//               {doc.experience || 10} years
//             </Typography>
//           </Stack>

//           <Stack direction="row" spacing={1}>
//             <LocationOnIcon sx={{ fontSize: 16, color: "#6b7280" }} />
//             <Typography fontSize={13} sx={{ color: "#6b7280" }}>
//               {doc.location || "Curewell Hospital"}
//             </Typography>
//           </Stack>
//         </Stack>

//         <Box sx={{ height: 1, background: "#e5e7eb", my: 2 }} />

//         <Typography fontWeight={600} sx={{ color: "#111827" }}>
//           ₹{doc.fees || 500} <span style={{ color: "#6b7280" }}>per visit</span>
//         </Typography>

       
//         <Button
//           fullWidth
//           sx={{ mt: 2, borderRadius: "10px", py: 1.2, background: "linear-gradient(135deg,#0d6e8a,#12343b)", color: "#fff", textTransform: "none" }}
//           onClick={() => {
//             const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
//             if (!userId) {
//               toast.error("Please sign in to book an appointment");
//               window.location.href = "/auth/signIn";
//               return;
//             }
//             onOpenModal();
//           }}
//         >
//           View Profile & Book
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default function FindDoctorPage() {
//   const [departmentsList, setDepartmentsList] = useState<string[]>(["All"]);
//   const [query, setQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [department, setDepartment] = useState("All");
//   const [fees, setFees] = useState<number[]>([0, 2000]);
//   const [loadingId, setLoadingId] = useState<number | null>(null);
//   const [page, setPage] = useState(1);

//   const mutation = useDoctorListMutation();
//   const bookMutation = useDoctorAppoinment();

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedQuery(query), 500);
//     return () => clearTimeout(timer);
//   }, [query]);

//   useEffect(() => {
//     mutation.mutate({ search: debouncedQuery, department: department === "All" ? "" : department, minFees: fees[0], maxFees: fees[1], page, limit: 6 });
//   }, [debouncedQuery, department, fees, page]);

//   const [openModal, setOpenModal] = useState(false);
//   const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
//   const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<{ date?: string; time?: string } | null>(null);

//   const res = mutation.data;
//   const doctors = res?.data?.doctors || res?.doctors || res?.data || [];
//   const totalPages = res?.data?.totalPages || res?.totalPages || 1;

//   useEffect(() => {
//     const setNames = new Set<string>();
//     (doctors || []).forEach((doc: any) => {
//       const name = doc?.department?.name || doc?.specialty || doc?.role;
//       if (name) setNames.add(name);
//     });
//     setDepartmentsList(["All", ...Array.from(setNames)]);
//   }, [res]);

//   const filteredDoctors = doctors.filter((doc: any) => {
//     if (department === "All") return true;
//     const n = doc?.department?.name || doc?.specialty || doc?.role || "";
//     return n.toLowerCase() === department.toLowerCase();
//   });

//   return (
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
//       <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={4}>
//           <Box sx={{ flex: 1, display: "flex", alignItems: "center", background: "#f1f3f5", borderRadius: "50px", px: 2, height: 50 }}>
//             <Box sx={{ mr: 1, color: "#9aa0a6" }}>🔍</Box>
//             <TextField fullWidth placeholder="Search by doctor name or specialty..." variant="standard" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ disableUnderline: true }} />
//           </Box>

//           <TextField select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} variant="standard" InputProps={{ disableUnderline: true }} sx={{ minWidth: 220, background: "#f1f3f5", borderRadius: "50px", px: 2, height: 50 }}>
//             {departmentsList.map((dep) => (
//               <MenuItem key={dep} value={dep}>
//                 {dep}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Stack>

//         {mutation.isLoading && (
//           <Box textAlign="center" py={6}>
//             <CircularProgress />
//           </Box>
//         )}

//         <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
//           {filteredDoctors.map((doc: any, i: number) => (
//             <DoctorCard
//               key={doc.id ?? doc._id ?? doc.doctorId ?? i}
//               doc={doc}
//               onOpenModal={(slot) => {
//                 const idToSend = doc.id ?? doc._id ?? doc.doctorId;
//                 setSelectedDoctorId(idToSend ?? null);
//                 setSelectedDoctor(doc ?? null);
//                 setSelectedSlot(slot || null);
//                 setOpenModal(true);
//               }}
//             />
//           ))}
//         </Box>

//         <AppointmentModal
//           open={openModal}
//           onClose={() => setOpenModal(false)}
//           doctorId={selectedDoctorId}
//           doctor={selectedDoctor}
//           defaultDate={selectedSlot?.date || ""}
//           defaultTime={selectedSlot?.time || ""}
//           onSubmit={async ({ date, time, name }) => {
//             if (!selectedDoctorId) return;
//             const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
//             if (!userId) {
//               toast.error("Please sign in to book an appointment");
//               setOpenModal(false);
//               return;
//             }

//             setLoadingId(selectedDoctorId as any);
//             return new Promise<void>((resolve) => {
//               bookMutation.mutate({ doctorId: selectedDoctorId, userId, date, time, name }, {
//                 onSuccess: () => {
//                   setLoadingId(null);
//                   setOpenModal(false);
//                   resolve();
//                 },
//                 onError: () => {
//                   setLoadingId(null);
//                   setOpenModal(false);
//                   resolve();
//                 },
//               });
//             });
//           }}
//         />

//         {!mutation.isLoading && totalPages > 1 && (
//           <Box display="flex" justifyContent="center" mt={6}>
//             <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" shape="rounded" />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }
