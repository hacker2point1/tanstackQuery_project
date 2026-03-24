"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Alert,
  Button,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { useCenters } from "@/customHooks/query/useCenters.query.hooks";

// import { useCenters } from "@/hooks/queries/useCenters.query";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LocationModal({ open, onClose }: Props) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationError, setLocationError] = useState("");

  const getUserLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const { data, isLoading, isError, error } = useCenters(lat, lng, open, 5000);

  const handleOpenMap = (centerLat: number, centerLng: number, centerName: string) => {
    const mapUrl = `https://www.google.com/maps/search/${centerLat},${centerLng}?query=${encodeURIComponent(centerName)}`;
    window.open(mapUrl, "_blank");
  };

  useEffect(() => {
    if (open) {
      setLocationError("");
      getUserLocation()
        .then((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        })
        .catch(() => {
          setLocationError("Location permission denied. Please enable location access.");
        });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nearby Centers</DialogTitle>

      <DialogContent>
        {/* Location Error */}
        {locationError && <Alert severity="error">{locationError}</Alert>}

        {/* Loading */}
        {isLoading && (
          <Box textAlign="center" py={3}>
            <CircularProgress />
            <Typography mt={2}>Finding nearby centers...</Typography>
          </Box>
        )}

        {/* API Error */}
        {isError && (
          <Alert severity="error">
            Failed to fetch centers: {error?.message || "Unknown error"}
          </Alert>
        )}

        {/* No Data */}
        {!isLoading && !isError && data?.length === 0 && (
          <Typography>No centers found within 5km</Typography>
        )}

        {/* Data */}
        {!isLoading && !isError && (
          <Stack spacing={2} mt={2}>
            {data?.map((center) => (
              <Box
                key={center._id}
                p={2}
                border="1px solid #ddd"
                borderRadius={2}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Box flex={1}>
                    <Typography fontWeight="bold">{center.name}</Typography>
                    <Typography variant="body2">{center.address}</Typography>
                    <Typography variant="body2">{center.phone}</Typography>
                    {center.distance && (
                      <Typography variant="caption" color="textSecondary">
                        Distance: {(center.distance / 1000).toFixed(2)} km
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<MapIcon />}
                    onClick={() => {
                      const [lng, lat] = center.location.coordinates;
                      handleOpenMap(lat, lng, center.name);
                    }}
                    sx={{
                      background: "linear-gradient(135deg, #00A76F, #00C58A)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #007F56, #009E6E)",
                      },
                      ml: 1,
                      flexShrink: 0,
                    }}
                  >
                    Goto the direction
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}