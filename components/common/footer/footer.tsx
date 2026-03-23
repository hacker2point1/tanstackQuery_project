"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from '@mui/icons-material/X';

const linkStyle = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontFamily:"var(--font-montserrat), sans-serif",
  "&:hover": {
    color: "#e67aa0",
    transform: "translateX(4px)",
  },
};

const socialStyle = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#e67aa0",
    transform: "translateY(-3px) scale(1.1)",
  },
};

const Footer = () => {
  const [openToast, setOpenToast] = useState(false);

  const handleSubscribe = () => {
    setOpenToast(true);
  };

  const handleClose = () => {
    setOpenToast(false);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #2c6a9f, #3f82b8)",
        color: "#fff",
        // borderTopLeftRadius: "80px",
        // borderTopRightRadius: "80px",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* TOP SECTION */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* LOGO */}
          <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/img/logo3.png"
              alt="Curewell Logo"
              sx={{
                height: { xs: 80, md: 110 },
                width: "auto",
                maxWidth: { xs: 180, md: 240 },
                objectFit: "contain",
              }}
            />
          </Box>

          {/* LINKS */}
          <Stack direction={{ xs: "column", md: "row", }} spacing={8}>
            <Stack spacing={1.5}>
              <Typography component={Link} href="/about" sx={linkStyle}>About Us</Typography>
              <Typography component={Link} href="/facilities" sx={linkStyle}>Facilities</Typography>
              <Typography component={Link} href="/services" sx={linkStyle}>Medical Services</Typography>
              <Typography component={Link} href="/international" sx={linkStyle}>International Patients</Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Typography component={Link} href="/insurance" sx={linkStyle}>Insurance</Typography>
              <Typography component={Link} href="/life" sx={linkStyle}>Life at Curewell</Typography>
              <Typography component={Link} href="/resources" sx={linkStyle}>Resources</Typography>
              <Typography component={Link} href="/contact" sx={linkStyle}>Contact Us</Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Typography component={Link} href="/terms" sx={linkStyle}>Terms & Condition</Typography>
              <Typography component={Link} href="/privacy" sx={linkStyle}>Privacy Policy</Typography>
              <Typography component={Link} href="/cookies" sx={linkStyle}>Cookie Policy</Typography>
            </Stack>
          </Stack>

          {/* NEWSLETTER */}
          <Box>
            <Typography sx={{ mb: 2 ,fontFamily:"var(--font-montserrat), sans-serif",}}>
              Subscribe to our newsletter
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: "50px",
                overflow: "hidden",
                width: "280px",
              }}
            >
              <TextField
                placeholder="Your email address"
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    px: 2,
                    py: 1,
                    fontSize: "14px",
                    color: "#12343b",
                  },
                }}
              />

              {/* CLICK HANDLER */}
              <IconButton
                onClick={handleSubscribe}
                sx={{
                  backgroundColor: "#e67aa0",
                  color: "#fff",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  mr: 0.5,

                  "&:hover": {
                    backgroundColor: "#d45d87",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>

            {/* SOCIAL ICONS */}
           
            <Stack direction="row" spacing={2} mt={3}>
               <Typography sx={{fontFamily:"var(--font-montserrat), sans-serif"}}>Follow us on:</Typography>
              <Box component={Link} href="https://www.linkedin.com/" sx={socialStyle}><LinkedInIcon /></Box>
              <Box component={Link} href="https://x.com/" sx={socialStyle}><XIcon /></Box>
              <Box component={Link} href="https://www.facebook.com/" sx={socialStyle}><FacebookIcon /></Box>
              <Box component={Link} href="https://www.instagram.com/infoxhacker/" sx={socialStyle}><InstagramIcon /></Box>
              {/* <Box component={Link} href="https://www.youtube.com/" sx={socialStyle}><YouTubeIcon /></Box> */}
            </Stack>
          </Box>
        </Stack>

        {/* underline */}
        <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.25)" }} />

        {/* footer two */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ opacity: 0.9 ,fontFamily:"var(--font-montserrat), sans-serif",}}>
            Copyright © 2026 Curewell Hospitals. All rights reserved.
          </Typography>

          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "50px",
              px: 2,
              py: 0.5,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily:"var(--font-montserrat), sans-serif",

              "&:hover": {
                backgroundColor: "#e67aa0",
                borderColor: "#e67aa0",
              },
            }}
          >
            curewell
          </Box>
        </Stack>
      </Container>

      {/* toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Thanks for subscribing!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;




// "use client";

// import Link from "next/link";

// import {
//   Box,
//   Container,
//   Typography,
//   Stack,
//   TextField,
//   IconButton,
//   Divider,
// } from "@mui/material";

// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";

// const linkStyle = {
//   cursor: "pointer",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     color: "#e67aa0",
//     transform: "translateX(4px)",
//   },
// };

// const socialStyle = {
//   cursor: "pointer",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     color: "#e67aa0",
//     transform: "translateY(-3px) scale(1.1)",
//   },
// };

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#1f4c7a",
//         color: "#fff",
//         borderTopLeftRadius: "80px",
//         borderTopRightRadius: "80px",
//         pt: 8,
//         pb: 4,
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* TOP SECTION */}
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={6}
//           justifyContent="space-between"
//           alignItems="flex-start"
//         >
//           {/* ✅ BIGGER LOGO */}
//           <Box
//             component={Link}
//             href="/"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Box
//               component="img"
//               src="/img/logo3.png"
//               alt="Curewell Logo"
//               sx={{
//                 height: { xs: 80, md: 110 }, // 🔥 increased size
//                 width: "auto",
//                 maxWidth: { xs: 180, md: 240 }, // 🔥 prevents overflow
//                 objectFit: "contain",
//               }}
//             />
//           </Box>

//           {/* LINKS */}
//           <Stack direction={{ xs: "column", md: "row" }} spacing={8}>
//             <Stack spacing={1.5}>
//               <Typography component={Link} href="/about" sx={linkStyle}>
//                 About Us
//               </Typography>
//               <Typography component={Link} href="/facilities" sx={linkStyle}>
//                 Facilities
//               </Typography>
//               <Typography component={Link} href="/services" sx={linkStyle}>
//                 Medical Services
//               </Typography>
//               <Typography component={Link} href="/international" sx={linkStyle}>
//                 International Patients
//               </Typography>
//             </Stack>

//             <Stack spacing={1.5}>
//               <Typography component={Link} href="/insurance" sx={linkStyle}>
//                 Insurance
//               </Typography>
//               <Typography component={Link} href="/life" sx={linkStyle}>
//                 Life at Curewell
//               </Typography>
//               <Typography component={Link} href="/resources" sx={linkStyle}>
//                 Resources
//               </Typography>
//               <Typography component={Link} href="/contact" sx={linkStyle}>
//                 Contact Us
//               </Typography>
//             </Stack>

//             <Stack spacing={1.5}>
//               <Typography component={Link} href="/terms" sx={linkStyle}>
//                 Terms & Condition
//               </Typography>
//               <Typography component={Link} href="/privacy" sx={linkStyle}>
//                 Privacy Policy
//               </Typography>
//               <Typography component={Link} href="/cookies" sx={linkStyle}>
//                 Cookie Policy
//               </Typography>
//             </Stack>
//           </Stack>

//           {/* NEWSLETTER */}
//           <Box>
//             <Typography sx={{ mb: 2 }}>
//               Subscribe to our newsletter
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#ffffff",
//                 borderRadius: "50px",
//                 overflow: "hidden",
//                 width: "280px",
//               }}
//             >
//               <TextField
//                 placeholder="Your email address"
//                 variant="standard"
//                 fullWidth
//                 InputProps={{
//                   disableUnderline: true,
//                   sx: {
//                     px: 2,
//                     py: 1,
//                     fontSize: "14px",
//                     color: "#12343b",
//                   },
//                 }}
//               />

//               <IconButton
//                 sx={{
//                   backgroundColor: "#e67aa0",
//                   color: "#fff",
//                   width: 44,
//                   height: 44,
//                   borderRadius: "50%",
//                   mr: 0.5,

//                   "&:hover": {
//                     backgroundColor: "#d45d87",
//                     transform: "scale(1.1)",
//                   },
//                 }}
//               >
//                 <ArrowForwardIcon />
//               </IconButton>
//             </Box>

//             {/* SOCIAL ICONS */}
//             <Stack direction="row" spacing={2} mt={3}>
//               <Box component={Link} href="#" sx={socialStyle}>
//                 <LinkedInIcon />
//               </Box>
//               <Box component={Link} href="#" sx={socialStyle}>
//                 <TwitterIcon />
//               </Box>
//               <Box component={Link} href="#" sx={socialStyle}>
//                 <FacebookIcon />
//               </Box>
//               <Box component={Link} href="#" sx={socialStyle}>
//                 <InstagramIcon />
//               </Box>
//               <Box component={Link} href="#" sx={socialStyle}>
//                 <YouTubeIcon />
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>

//         {/* DIVIDER */}
//         <Divider
//           sx={{
//             my: 5,
//             borderColor: "rgba(255,255,255,0.2)",
//           }}
//         />

//         {/* BOTTOM */}
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           justifyContent="space-between"
//           alignItems="center"
//           spacing={2}
//         >
//           <Typography sx={{ opacity: 0.8 }}>
//             Copyright © 2026 Curewell Hospitals. All rights reserved.
//           </Typography>

//           <Box
//             component={Link}
//             href="/"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               border: "1px solid rgba(255,255,255,0.4)",
//               borderRadius: "50px",
//               px: 2,
//               py: 0.5,
//               fontSize: "12px",
//               cursor: "pointer",
//               transition: "all 0.3s ease",

//               "&:hover": {
//                 backgroundColor: "#e67aa0",
//                 borderColor: "#e67aa0",
//               },
//             }}
//           >
//             curewell
//           </Box>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

