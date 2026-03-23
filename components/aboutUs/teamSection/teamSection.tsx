//api handeled card
"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const doctors = [
  { id: 1, name: "Dr. John Doe", role: "Cardiologist", img: "/img/doctor1.jpg" },
  { id: 2, name: "Dr. Sarah Smith", role: "Neurologist", img: "/img/doctor2.jpg" },
  { id: 3, name: "Dr. Alex Brown", role: "Orthopedic", img: "/img/doctor3.jpg" },
];

const item = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TeamSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // ✅ TRACK WHICH BUTTON IS LOADING
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // ✅ TANSTACK MUTATION
  const bookingMutation = useMutation({
    mutationFn: async (doctorId: number) => {
      setLoadingId(doctorId);

      // 🔥 replace with your API
      return new Promise((resolve) =>
        setTimeout(() => resolve(true), 1000)
      );
    },
    onSettled: () => {
      setLoadingId(null); // ✅ reset after success/error
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
          gap: { xs: 3, md: 4 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {doctors.map((doc) => (
          <Box key={doc.id} sx={{ flex: 1 }}>
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
                {/* IMAGE */}
                <Box
                  sx={{
                    height: 280,
                    backgroundImage: `url(${doc.img})`,
                    backgroundSize: "cover",
                  }}
                />

                {/* CONTENT */}
                <Box p={3} textAlign="center">
                  <Typography fontWeight={700} color="#12343b">
                    {doc.name}
                  </Typography>

                  <Typography color="#5f7c80" fontSize={14}>
                    {doc.role}
                  </Typography>

                  {/* ✅ FIXED BUTTON */}
                  <Button
                    fullWidth
                    onClick={() => bookingMutation.mutate(doc.id)}
                    disabled={loadingId === doc.id}
                    sx={{
                      mt: 2.5,
                      borderRadius: "999px",
                      py: 1,
                      background:
                        "linear-gradient(135deg,#1878A2,#E780A9)",
                      color: "#fff",
                    }}
                  >
                    {loadingId === doc.id
                      ? "Booking..."
                      : "Book Now"}
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
    </Box>
  );
};

export default TeamSection;





//static cards
// "use client";

// import { Box, Typography, useTheme } from "@mui/material";
// import { motion } from "framer-motion";

// const doctors = [
//   { name: "Dr. John Doe", role: "Cardiologist", img: "/img/doctor1.jpg" },
//   { name: "Dr. Sarah Smith", role: "Neurologist", img: "/img/doctor2.jpg" },
//   { name: "Dr. Alex Brown", role: "Orthopedic", img: "/img/doctor3.jpg" },
// ];

// const item = {
//   hidden: { opacity: 0, y: 60, scale: 0.96 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const TeamSection = () => {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         py: { xs: 10, md: 14 },
//         px: { xs: 2, md: 6 },
//         position: "relative",
//         overflow: "hidden",
//         background: isDark
//           ? "linear-gradient(180deg, #070F22 0%, #0B1736 100%)"
//           : "linear-gradient(180deg, #ffffff 0%, #f4f9fc 100%)",
//       }}
//     >
//       {/* Glow Effects */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 400,
//           height: 400,
//           borderRadius: "50%",
//           background: "#1878A2",
//           opacity: 0.12,
//           filter: "blur(120px)",
//           top: "-100px",
//           left: "10%",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           width: 400,
//           height: 400,
//           borderRadius: "50%",
//           background: "#E780A9",
//           opacity: 0.12,
//           filter: "blur(120px)",
//           bottom: "-100px",
//           right: "10%",
//         }}
//       />

//       {/* Heading */}
//       <Typography
//         fontSize={{ xs: 28, md: 42 }}
//         fontWeight={800}
//         textAlign="center"
//         mb={8}
//         sx={{
//           background: "linear-gradient(90deg,#1878A2,#E780A9)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Our Experts
//       </Typography>

//       {/* Row Layout */}
//       <Box
//         sx={{
//           maxWidth: "1300px",
//           mx: "auto",
//           display: "flex",
//           gap: { xs: 3, md: 4 },
//           flexDirection: { xs: "column", md: "row" },
//         }}
//       >
//         {doctors.map((doc, i) => (
//           <Box key={i} sx={{ flex: 1 }}>
//             <motion.div
//               variants={item}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               whileHover={{ y: -12, scale: 1.03 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 200,
//                 damping: 15,
//               }}
//             >
//               <Box
//                 sx={{
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   backdropFilter: "blur(12px)",
//                   background: isDark
//                     ? "rgba(255,255,255,0.05)"
//                     : "rgba(255,255,255,0.95)",
//                   border: isDark
//                     ? "1px solid rgba(255,255,255,0.1)"
//                     : "1px solid rgba(0,0,0,0.05)",
//                   boxShadow: isDark
//                     ? "0 10px 40px rgba(0,0,0,0.4)"
//                     : "0 10px 30px rgba(0,0,0,0.08)",
//                 }}
//               >
//                 {/* Image */}
//                 <Box
//                   sx={{
//                     height: 280,
//                     backgroundImage: `url(${doc.img})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 />

//                 {/* Content */}
//                 <Box p={3} textAlign="center">
//                   {/* ✅ UPDATED NAME COLOR */}
//                   <Typography
//                     fontWeight={700}
//                     fontSize={18}
//                     sx={{
//                       color: isDark ? "#ffffff" : "#12343b",
//                       fontFamily: "var(--font-montserrat), sans-serif",
//                     }}
//                   >
//                     {doc.name}
//                   </Typography>

//                   {/* ✅ UPDATED ROLE COLOR */}
//                   <Typography
//                     sx={{
//                       fontSize: 14,
//                       mt: 0.5,
//                       color: isDark
//                         ? "rgba(255,255,255,0.7)"
//                         : "#5f7c80",
//                       fontFamily: "var(--font-montserrat), sans-serif",
//                     }}
//                   >
//                     {doc.role}
//                   </Typography>
//                 </Box>

//                 {/* Gradient Bottom Bar */}
//                 <Box
//                   sx={{
//                     height: "4px",
//                     width: "100%",
//                     background:
//                       "linear-gradient(90deg,#1878A2,#E780A9)",
//                   }}
//                 />
//               </Box>
//             </motion.div>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default TeamSection;