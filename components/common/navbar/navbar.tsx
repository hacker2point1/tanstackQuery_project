"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import SearchGlobalModal from "@/components/modals/searchGlobalModal/searchGlobalModal";
import AuthModal from "@/components/modals/authModal/authModal";
import AuthSwitcher from "@/components/modals/authSwitcher/authSwitcher";

// ✅ Zustand
import useUserStore from "@/zusStand/store";

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Zustand state
  const { token, logout, initializeToken } = useUserStore();

  const router = useRouter();

  // ✅Load token from cookies
  useEffect(() => {
    initializeToken();
  }, [initializeToken]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Login / Logout
  const handleAuthClick = async () => {
    if (token) {
      await logout();
      router.push("/");
    } else {
      setOpenAuth(true);
    }
  };

  // Profile menu state
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(profileAnchor);
  const handleOpenProfile = (e: React.MouseEvent<HTMLElement>) => setProfileAnchor(e.currentTarget);
  const handleCloseProfile = () => setProfileAnchor(null);

  const navLinkStyle = {
    position: "relative",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontWeight: 500,
    color: "#000",
    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      color: "#0d6e8a",
      transform: "translateY(-2px)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -4,
      width: "0%",
      height: "2px",
      backgroundColor: "#0d6e8a",
      transition: "width 0.3s ease",
    },

    "&:hover::after": {
      width: "100%",
    },
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "white",
          px: 4,
          transition: "transform 0.3s ease",
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "100px" }}>
          {/* LOGO */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/img/logo3.png"
              alt="MedCare Logo"
              sx={{
                height: 98,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* NAV LINKS */}
          <Stack direction="row" spacing={4}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography sx={navLinkStyle}>Home</Typography>
            </Link>

            <Link href="/about" style={{ textDecoration: "none" }}>
              <Typography sx={navLinkStyle}>About Us</Typography>
            </Link>

            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Typography sx={navLinkStyle}>Contact Us</Typography>
            </Link>
          </Stack>

          {/* RIGHT SECTION */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => setOpenSearch(true)}>
              <SearchIcon />
            </IconButton>

            <IconButton onClick={() => setOpenLocation(true)}>
              <LocationOnIcon />
            </IconButton>

            {token && (
              <>
                <Button
                  onClick={handleOpenProfile}
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    ml: 1,
                    height: 36,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 1.5,
                    color: "#111",
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
                  Profile
                </Button>

                <Menu anchorEl={profileAnchor} open={openProfile} onClose={handleCloseProfile}>
                  <MenuItem component={Link} href="/profile" onClick={handleCloseProfile}>
                    View Profile
                  </MenuItem>
                  <MenuItem component={Link} href="/history" onClick={handleCloseProfile}>
                    My Appointments
                  </MenuItem>
                </Menu>
              </>
            )}

            <Button
              onClick={handleAuthClick}
              variant="contained"
              disableElevation
              sx={(theme) => ({
                fontFamily: "var(--font-montserrat), sans-serif",
                ml: 1,
                height: 36,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                px: 2,
                background: token
                  ? "linear-gradient(135deg, #ef4444, #b91c1c)"
                  : "linear-gradient(135deg, #212B36, #000000)",
                color: "#fff",
                "&:hover": {
                  background: token
                    ? "linear-gradient(135deg, #b91c1c, #7f1d1d)"
                    : "linear-gradient(135deg, #000000, #212B36)",
                  transform: "translateY(-2px)",
                },
              })}
            >
              {token ? "Logout" : "Login"}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: "100px" }} />

      {/* MODALS */}
      <SearchGlobalModal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        placeholder="Search doctor, department..."
        icon={<SearchIcon sx={{ fontSize: 24 }} />}
      />

      <SearchGlobalModal
        open={openLocation}
        onClose={() => setOpenLocation(false)}
        placeholder="Search your location..."
        icon={<LocationOnIcon sx={{ color: "#00A76F", fontSize: 24 }} />}
      />

     
      <Box
        sx={{
          bgcolor: "#f6f6f6",
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Button
          component={Link}
          href="/find-doctor"
          sx={{
            fontFamily: "var(--font-montserrat), sans-serif",
            px: 2.5,
            height: 35,
            borderRadius: "999px",
            color: "#fff",
            background: "linear-gradient(135deg, #00A76F, #00C58A)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #007F56, #009E6E)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
          startIcon={<LocalHospitalRoundedIcon />}
        >
          Book Appoinment
        </Button>

        {/* <Button
          component={Link}
          href="/appointment"
          sx={{
            fontFamily: "var(--font-montserrat), sans-serif",
            px: 2.5,
            height: 35,
            borderRadius: "999px",
            color: "#fff",
            background: "linear-gradient(135deg, #FFB3B6, #FFA1A5)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #e0898d, #d9757a)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            },
          }}
          startIcon={<MedicalServicesIcon />}
        >
          Book Appointment
        </Button> */}

        {/* <Button
          component={Link}
          href="/find-department"
          sx={{
            fontFamily: "var(--font-montserrat), sans-serif",
            px: 2.5,
            height: 35,
            borderRadius: "999px",
            color: "#212B36",
            background: "#F4F6F8",
            border: "1px solid rgba(145,158,171,0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#e0e3e7",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            },
          }}
          startIcon={<ApartmentIcon />}
        >
          Find Department
        </Button> */}
      </Box>

      {/* AUTH MODAL */}
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)}>
        <AuthSwitcher onClose={() => setOpenAuth(false)} />
      </AuthModal>
    </>
  );
}




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Stack,
//   Button,
//   IconButton,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import ApartmentIcon from "@mui/icons-material/Apartment";

// import SearchGlobalModal from "@/components/modals/searchGlobalModal/searchGlobalModal";
// import AuthModal from "@/components/modals/authModal/authModal";
// import AuthSwitcher from "@/components/modals/authSwitcher/authSwitcher";

// export default function Navbar() {
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openLocation, setOpenLocation] = useState(false);
//   const [openAuth, setOpenAuth] = useState(false);

//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScroll, setLastScroll] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;

//       if (currentScroll > lastScroll && currentScroll > 80) {
//         setShowNavbar(false);
//       } else {
//         setShowNavbar(true);
//       }

//       setLastScroll(currentScroll);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScroll]);

//   // nav-link
//   const navLinkStyle = {
//     position: "relative",
//     fontFamily: "var(--font-montserrat), sans-serif",
//     fontWeight: 500,
//     color: "#000",
//     transition: "all 0.3s ease",
//     cursor: "pointer",

//     "&:hover": {
//       color: "#0d6e8a",
//       transform: "translateY(-2px)",
//     },

//     "&::after": {
//       content: '""',
//       position: "absolute",
//       left: 0,
//       bottom: -4,
//       width: "0%",
//       height: "2px",
//       backgroundColor: "#0d6e8a",
//       transition: "width 0.3s ease",
//     },

//     "&:hover::after": {
//       width: "100%",
//     },
//   };

//   return (
//     <>
//       {/* TOP NAVBAR */}
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           background: "white",
//           px: 4,
//           transition: "transform 0.3s ease",
//           transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between", minHeight: "100px" }}>
//           {/* LOGO */}
//           <Box
//             component={Link}
//             href="/"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               textDecoration: "none",
//             }}
//           >
//             <Box
//               component="img"
//               src="/img/logo3.png"
//               alt="MedCare Logo"
//               sx={{
//                 height: 98,
//                 width: "auto",
//                 objectFit: "contain",
//               }}
//             />
//           </Box>

//           {/* nav-links with underline */}
//           <Stack direction="row" spacing={4}>
//             <Link href="/" style={{ textDecoration: "none" }}>
//               <Typography sx={navLinkStyle}>Home</Typography>
//             </Link>

//             <Link href="/about" style={{ textDecoration: "none" }}>
//               <Typography sx={navLinkStyle}>About Us</Typography>
//             </Link>

//             <Link href="/contact" style={{ textDecoration: "none" }}>
//               <Typography sx={navLinkStyle}>Contact Us</Typography>
//             </Link>
//           </Stack>

//           {/* RIGHT SECTION */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             <IconButton onClick={() => setOpenSearch(true)}>
//               <SearchIcon />
//             </IconButton>

//             <IconButton onClick={() => setOpenLocation(true)}>
//               <LocationOnIcon />
//             </IconButton>

//             <Button
//               onClick={() => setOpenAuth(true)}
//               variant="contained"
//               disableElevation
//               sx={{
//                 fontFamily: "var(--font-montserrat), sans-serif",
//                 ml: 1,
//                 height: 36,
//                 borderRadius: "999px",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 px: 2,
//                 background: "linear-gradient(135deg, #212B36, #000000)",
//                 color: "#fff",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #000000, #212B36)",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//             >
//               Login
//             </Button>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ height: "100px" }} />

//       {/* MODALS */}
//       <SearchGlobalModal
//         open={openSearch}
//         onClose={() => setOpenSearch(false)}
//         placeholder="Search doctor, department..."
//         icon={<SearchIcon sx={{ fontSize: 24 }} />}
//       />

//       <SearchGlobalModal
//         open={openLocation}
//         onClose={() => setOpenLocation(false)}
//         placeholder="Search your location..."
//         icon={<LocationOnIcon sx={{ color: "#00A76F", fontSize: 24 }} />}
//       />

//       {/* BOTTOM BAR (UNCHANGED) */}
//         <Box
//           sx={{
//             bgcolor: "#f6f6f6",
//             px: 4,
//             py: 2,
//             display: "flex",
//             justifyContent: "center",
//             gap: 4,
//           }}
//         >
//           <Button
//             component={Link}
//             href="/find-doctor"
//             sx={{
//               fontFamily: "var(--font-montserrat), sans-serif",
//               px: 2.5,
//               height: 35,
//               borderRadius: "999px",
//               color: "#fff",
//               background: "linear-gradient(135deg, #00A76F, #00C58A)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #007F56, #009E6E)",
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
//               },
//             }}
//             startIcon={<LocalHospitalRoundedIcon />}
//           >
//             Find Doctor
//           </Button>

//         <Button
//           component={Link}
//           href="/appointment"
//           sx={{
//             fontFamily: "var(--font-montserrat), sans-serif",
//             px: 2.5,
//             height: 35,
//             borderRadius: "999px",
//             color: "#fff",
//             background: "linear-gradient(135deg, #FFB3B6, #FFA1A5)",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               background: "linear-gradient(135deg, #e0898d, #d9757a)",
//               transform: "translateY(-2px)",
//               boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
//             },
//           }}
//           startIcon={<MedicalServicesIcon />}
//         >
//           Book Appointment
//         </Button>

//         <Button
//           component={Link}
//           href="/find-department"
//           sx={{
//             fontFamily: "var(--font-montserrat), sans-serif",
//             px: 2.5,
//             height: 35,
//             borderRadius: "999px",
//             color: "#212B36",
//             background: "#F4F6F8",
//             border: "1px solid rgba(145,158,171,0.2)",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               background: "#e0e3e7",
//               transform: "translateY(-2px)",
//               boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
//             },
//           }}
//           startIcon={<ApartmentIcon />}
//         >
//           Find Department
//         </Button>
//       </Box>

//       {/* AUTH MODAL */}
//       <AuthModal open={openAuth} onClose={() => setOpenAuth(false)}>
//         <AuthSwitcher onClose={() => setOpenAuth(false)} />
//       </AuthModal>
      
//       {/* FIND DOCTOR MODAL removed — navigation uses /find-doctor page */}
//     </>
//   );
// }