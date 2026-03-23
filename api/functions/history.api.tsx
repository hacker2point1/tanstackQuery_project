import { AxiosInstance } from "../axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";

export async function getHistory(params?: { userId?: string; doctorId?: string }) {
  const res = await AxiosInstance.get(endpoints.auth.history, { params });
  return res.data;
}

export default getHistory;
