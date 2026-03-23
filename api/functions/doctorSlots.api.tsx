import { AxiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";

export const DoctorSlotsFunction = async ({ doctorId, date }: { doctorId: string; date: string }) => {
  const response = await AxiosInstance.post(endpoints.doctor.slots, { doctorId, date });
  return response.data;
};
