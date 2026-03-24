import { fetchCenters } from "@/api/functions/map.api";
import { useQuery } from "@tanstack/react-query";
// import { fetchCenters } from "@/services/map.service";
// import { Center } from "@/types/map.types";

interface Center {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  distance?: number;
}

export const useCenters = (
  lat: number | null,
  lng: number | null,
  enabled: boolean,
  distance: number = 5000
) => {
  return useQuery<Center[]>({
    queryKey: ["centers", lat, lng, distance],
    queryFn: () => fetchCenters(lat!, lng!, distance),
    enabled: enabled && !!lat && !!lng,
    staleTime: 1000 * 60 * 5, // cache 5 mins
    retry: 2,
  });
};