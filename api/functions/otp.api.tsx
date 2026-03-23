import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../axios/axios";
import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

export const OtpFunction: MutationFunction<otpResponse,otpPayload> = async (payload: otpResponse) => {
    const res = await AxiosInstance.post<otpResponse>(endpoints.auth.otp, payload)
    return res.data

} 