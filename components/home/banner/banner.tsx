"use client";

import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// --- TYPEWRITER COMPONENT ---
const TypewriterText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <Box component="span" sx={{ color: "#d87aa0", position: "relative" }}>
      {`${words[index].substring(0, subIndex)}`}
      <Box
        component={motion.span}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        sx={{
          borderRight: "3px solid #d87aa0",
          ml: 0.5,
          display: "inline-block",
          height: "0.8em",
          verticalAlign: "middle",
        }}
      />
    </Box>
  );
};

// --- MAIN BANNER COMPONENT ---
const Banner = () => {
  const words = ["care", "healing", "wellness", "comfort", "trust", "hospitality"];

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ SAMPLE OPTIONS (Replace with API later)
  const options = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Radiology",
    "ENT Specialist",
    "General Medicine",
  ];

  // debounce controller
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => clearTimeout(handler);
  }, [search]);

  // 👉 API CALL TRIGGER (debounced)
  useEffect(() => {
    if (debouncedSearch) {
      console.log("Searching:", debouncedSearch);

      // 👉 Call API here
      // dispatch(searchDoctors(debouncedSearch))
    }
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const boxVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "450px", md: "600px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 0, md: 10 },
        py: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        justifyContent="center"
      >
        {/* ANIMATED ICON */}
        <Box
          component={motion.div}
          initial="hidden"
          animate="visible"
          sx={{
            width: { xs: 100, md: 140 },
            height: { xs: 100, md: 140 },
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[1, 2, 3, 4].map((item, i) => (
            <Box
              key={item}
              component={motion.div}
              custom={i}
              variants={boxVariants}
              sx={{
                backgroundColor: "#d87aa0",
                borderRadius:
                  item === 1
                    ? "0 50% 50% 50%"
                    : item === 2
                    ? "50% 0 50% 50%"
                    : item === 3
                    ? "50% 50% 0 50%"
                    : "50% 50% 50% 0",
              }}
            />
          ))}
        </Box>

        {/* TEXT CONTENT */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Typography
            variant="h1"
            
            sx={{
            fontFamily:"var(--font-montserrat), sans-serif",
              fontWeight: 600,
              color: "#12343b",
              lineHeight: 1.1,
              fontSize: { xs: "40px", md: "64px" },
              letterSpacing: "-0.02em",
              minHeight: { xs: "80px", md: "140px" },
            }}
          >
            Fragrance of <br />
            <TypewriterText words={words} />
          </Typography>

          <Typography
            sx={{
                fontFamily:"var(--font-montserrat), sans-serif",
              mt: 3,
              color: "#2f4f4f",
              fontSize: { xs: "18px", md: "22px" },
              maxWidth: "600px",
              lineHeight: 1.6,
              mx: { xs: "auto", md: 0 },
            }}
          >
            State of the art{" "}
            <Box component="span" sx={{ fontWeight: 700, color: "#d87aa0" }}>
              NABH
            </Box>{" "}
            accredited hospital in the heart of INDIA.
          </Typography>

          {/* 🔍 AUTOCOMPLETE SEARCH */}
          <Autocomplete
            freeSolo
            options={options}
            inputValue={search}
            onInputChange={(event, newValue) => handleSearch(newValue)}
            sx={{
              mt: 4,
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "50px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search doctors, departments..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    paddingRight: "10px",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#d87aa0" }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Banner;