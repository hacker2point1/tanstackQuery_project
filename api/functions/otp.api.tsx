import { MutationFunction } from "@tanstack/react-query";

import { endpoints } from "../endpoints/endpoints";
import { AxiosInstance } from "../axios/axios";

export const OtpFunction: MutationFunction<otpResponse, otpPayload> = async (
    payload: otpPayload
) => {
    const res = await AxiosInstance.post<otpResponse>(endpoints.auth.otp, payload);
    return res.data;
};