import { AxiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

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

export const fetchCenters = async (
  lat: number,
  lng: number,
  distance: number
): Promise<Center[]> => {
  try {
    const res = await AxiosInstance.get(endpoints.auth.mapLocation, {
      params: { lat, lng, distance },
    });
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching centers:", error);
    throw error;
  }
};