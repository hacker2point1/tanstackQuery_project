
import { AxiosInstance } from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";

export const ResetPasswordFunction = async ({
  id,
  token,
  password,
  confirm_password,
}: {
  //defining the type of the object
  id: string;
  token: string;
  password: string;
  confirm_password: string;
}) => {
  const response = await AxiosInstance.post(
    `${endpoints.auth.resetPassword}/${id}/${token}`,
    {
      password,
      confirm_password, 
    }
  );

  return response.data;
};