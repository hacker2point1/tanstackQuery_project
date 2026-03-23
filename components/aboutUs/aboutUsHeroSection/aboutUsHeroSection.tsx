"use client";

import { Box, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <Box
      sx={{
        height: { xs: "60vh", md: "75vh" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/img/aboutUsHero.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.05)", 
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content */}
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={2} maxWidth={700}>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              fontSize={{ xs: 32, md: 56 }}
              fontWeight={800}
              color="#fff"
              lineHeight={1.2}
            >
              About Curewell Hospital
            </Typography>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography
              fontSize={{ xs: 14, md: 18 }}
              color="#e0e0e0"
              lineHeight={1.6}
            >
              Delivering world-class healthcare with compassion, innovation,
              and a commitment to excellence. We care for every life that walks
              through our doors.
            </Typography>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default AboutHero;






// "use client";

// import { Box, Container, Typography, Stack } from "@mui/material";
// import { motion } from "framer-motion";

// const AboutHero = () => {
//   return (
//     <Box
//       sx={{
//         height: { xs: "60vh", md: "75vh" },
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         overflow: "hidden",
//       }}
//     >
//       {/* Background Image */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `url("/img/about-hero.jpg")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           transform: "scale(1.05)", // slight zoom effect
//         }}
//       />

//       {/* Gradient Overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
//         }}
//       />

//       {/* Content */}
//       <Container sx={{ position: "relative", zIndex: 2 }}>
//         <Stack spacing={2} maxWidth={700}>

//           {/* Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <Typography
//               fontSize={{ xs: 32, md: 56 }}
//               fontWeight={800}
//               color="#fff"
//               lineHeight={1.2}
//             >
//               About Curewell Hospital
//             </Typography>
//           </motion.div>

//           {/* Subheading */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             <Typography
//               fontSize={{ xs: 14, md: 18 }}
//               color="#e0e0e0"
//               lineHeight={1.6}
//             >
//               Delivering world-class healthcare with compassion, innovation,
//               and a commitment to excellence. We care for every life that walks
//               through our doors.
//             </Typography>
//           </motion.div>

//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default AboutHero;