"use client";

import { useRef } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const reviews = [
  {
    name: "Ashish Saxena",
    rating: 5,
    text: `"The best hospital in Vellore has a lot of neat and clean environments, patient care, and friendly doctors and staff."`,
  },
  {
    name: "Mallinathan",
    rating: 5,
    text: `"Lots of new equipment and great environment. The doctors and other staff were friendly and the canteen is also well-maintained"`,
  },
  {
    name: "Shaikh Mohammed Ayaz",
    rating: 4,
    text: `"Patient satisfaction is the first preference. The doctor’s treatment is too good, and the staff are always helpful."`,
  },
  {
    name: "Santhosh Kumar",
    rating: 5,
    text: `"Very good experience. The doctors and staff are very friendly. Admission, treatment, and post-surgery care were very good."`,
  },
];

const ReviewSection = () => {
  const swiperRef = useRef<any>(null);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 6 },
        background: "linear-gradient(to right, #e9d4e4, #f1e2c9)",
      }}
    >
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        spaceBetween={24}
        speed={2500}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: true, // we control manually
        }}
        allowTouchMove={false}
        slidesPerView={1.2}
        breakpoints={{
          600: { slidesPerView: 1.5 },
          900: { slidesPerView: 2.2 },
          1200: { slidesPerView: 3 },
        }}
        style={{
          transitionTimingFunction: "linear",
        }}

        /* mouse hover controller */
        onMouseEnter={() => {
          if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.stop();
          }
        }}
        onMouseLeave={() => {
          if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.start();
          }
        }}
      >
        {reviews.concat(reviews).map((review, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ height: "100%" }}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: "280px",
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  boxShadow: "none",
                  px: 3,
                  py: 4,
                  display: "flex",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 0,
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "20px",
                        color: "#12343b",
                        mb: 2,
                        fontFamily:"var(--font-montserrat), sans-serif",
                      }}
                    >
                      {review.name}
                    </Typography>

                    <Stack direction="row" spacing={0.5} mb={2}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{
                            fontSize: 18,
                            color:
                              i < review.rating
                                ? "#e67aa0"
                                : "#e0e0e0",
                          }}
                        />
                      ))}
                    </Stack>

                    <Typography
                      sx={{
                        color: "#2f4f4f",
                        fontSize: "16px",
                        lineHeight: 1.7,
                        fontWeight: 500,
                        fontFamily:"var(--font-montserrat), sans-serif",
                      }}
                    >
                      {review.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ReviewSection;