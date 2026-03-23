
import { AxiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const ResetLinkFunction = async ({ email }: { email: string }) => {
  const response = await AxiosInstance.post(
    endpoints.auth.resetLink,
    { email }
  );

  return response.data;
};