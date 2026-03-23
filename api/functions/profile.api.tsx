import { AxiosInstance } from "../axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";

export async function getProfile() {
  const res = await AxiosInstance.get(endpoints.auth.profile);
  return res.data;
}

export default getProfile;
