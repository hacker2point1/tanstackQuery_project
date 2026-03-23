"use client";

import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ContactInfo = () => {
  const data = [
    {
      icon: <LocationOnIcon />,
      title: "Address",
      value: "Kolkata, West Bengal, India",
      link: "https://www.google.com/maps?q=Kolkata",
    },
    {
      icon: <PhoneIcon />,
      title: "Phone",
      value: "+91 9876543210",
      link: "tel:+919876543210",
    },
    {
      icon: <EmailIcon />,
      title: "Email",
      value: "support@curewell.com",
      link: "mailto:support@curewell.com",
    },
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 1100, px: { xs: 2, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 4 },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {data.map((item, i) => (
              <Box key={i} sx={{ flex: { xs: "100%", md: "33.333%" } }}>
               {/* cards  */}
                <Box
                  component="a"
                  href={item.link}
                  target="_self"
                  rel="noopener noreferrer"
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: { xs: 4, md: 5 },
                    minHeight: 220,
                    borderRadius: "24px",
                    textAlign: "center",
                    background: "#fff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "all 0.4s ease",

                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    },

                    // Gradient border
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "24px",
                      padding: "1px",
                      background: "linear-gradient(135deg, #0d6e8a, #e67aa0)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      opacity: 0,
                      transition: "0.3s",
                    },

                    "&:hover::before": {
                      opacity: 1,
                    },

                    // Shine
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
                      transition: "0.6s",
                    },

                    "&:hover::after": {
                      left: "100%",
                    },
                  }}
                >
                  {/* icons */}
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0d6e8a, #3aa6c9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 28,
                      mb: 2,
                      transition: "0.3s",
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* title */}
                  <Typography fontWeight={700} sx={{ mb: 1, color: "#12343b",fontFamily:"var(--font-montserrat), sans-serif" }}>
                    {item.title}
                  </Typography>

                  {/* value */}
                  <Typography sx={{ color: "#666", fontSize: "15px" ,fontFamily:"var(--font-montserrat), sans-serif"}}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;