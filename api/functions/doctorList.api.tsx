import { MutationFunction } from "@tanstack/react-query";
import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

// Correct types
export const DoctorListFunction: MutationFunction<
  doctorListResponse,
  doctorListPayload
> = async (payload) => {
  const res = await AxiosInstance.post<doctorListResponse>(
    endpoints.doctor.list,
    payload
  );


  return res.data; 
};