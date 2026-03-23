import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

// Correct types
export const DoctorAppoinmentFunction: MutationFunction<
  doctorAppoinmentPayload,
  doctorAppoinmentResponse
> = async (payload) => {
  const res = await AxiosInstance.post<doctorListResponse>(
    endpoints.doctor.appoinment,
    payload
  );


  return res.data; 
};