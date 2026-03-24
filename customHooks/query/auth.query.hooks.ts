"use client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { RegistrationFunction } from "@/api/functions/register.api";
import { toast } from "sonner";
import { OtpFunction } from "@/api/functions/otp.api";
import { useRouter } from "next/navigation";
import { LoginFunction } from "@/api/functions/login.api";
import useUserStore from "@/zusStand/store";
import { ResetLinkFunction } from "@/api/functions/resetLink.api";
import { ResetPasswordFunction } from "@/api/functions/resetPassword.api";

//custom quary
// signUp
export const useSignUpMutation = (opts?: { redirectToOtp?: boolean }) => {
  const redirectToOtp = opts?.redirectToOtp ?? true;
  const { queryClient } = useGlobalHooks();
  const router = useRouter();

  return useMutation({
    mutationFn: RegistrationFunction,
    onSuccess: (response) => {
      console.log(response);
      const { status, message, data } = response || {};
      const userId = data?.id;
      const email = data?.email;
      console.log(response);

      if (status === true) {
        if (typeof window !== "undefined") {
          if (userId) localStorage.setItem("userId", userId);
          if (email) localStorage.setItem("email", email);
        }
        toast.success(message);
        if (redirectToOtp) {
          router.push("/auth/otp");
        }
      } else {
        toast.error(message);
      }
      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

//otp
export const useOtpMutation = (options?: {
  redirectToSignIn?: boolean;
  onSuccess?: () => void;
}) => {
  const { queryClient } = useGlobalHooks();
  const router = useRouter();
  const redirectToSignIn = options?.redirectToSignIn ?? true;

  return useMutation({
    mutationFn: OtpFunction,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (status === true) {
        toast.success(message);
        options?.onSuccess?.();
        if (redirectToSignIn) {
          router.push("/auth/signIn");
        }
      } else {
        toast.error(message);
      }
      queryClient.invalidateQueries({ queryKey: ["OTP"] });
    },
    onError: (error) => {
      console.log("error");
    },
  });
};

//login

export const useSignInMutation = (options?: {
  onSuccess?: () => void;
  redirectToHome?: boolean;
}) => {
  const { queryClient } = useGlobalHooks();
  const cookies = new Cookies();
  const router = useRouter();
  const redirectToHome = options?.redirectToHome ?? false;

  return useMutation({
    mutationFn: LoginFunction,
    onSuccess: (response) => {
      console.log(response);
      const token = (response as any)?.token;
      const status = (response as any)?.status;
      const message = (response as any)?.message;

      if (status === true) {
        cookies.set("token", token, {
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        });
        // update Zustand store immediately so UI updates without manual reload
        try { useUserStore.getState().setTokenAndUser(token); } catch (e) {}
        // persist user id/email when available so other flows can use it
        try {
          const userId = (response as any)?.userId || (response as any)?.data?.userId || (response as any)?.data?.id || (response as any)?.id || (response as any)?.data?._id || null;
          const email = (response as any)?.email || (response as any)?.data?.email || null;
          if (userId && typeof window !== "undefined") localStorage.setItem("userId", userId);
          if (email && typeof window !== "undefined") localStorage.setItem("email", email);
        } catch (e) {}
        // also store refresh token if provided by backend
        const refreshToken = (response as any)?.refreshToken || (response as any)?.data?.refreshToken;
        if (refreshToken) {
          cookies.set("refreshToken", refreshToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
          });
        }
        // refresh router so server/client state syncs (no manual refresh required)
        try { router.refresh(); } catch (e) {}
        toast.success(message);
        options?.onSuccess?.();
        if (redirectToHome) {
          // Only redirect when explicitly requested
          router.push("/");
        }
      } else {
        toast.error(message);
      }
      queryClient.invalidateQueries({ queryKey: ["SIGNUP"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useResetLinkMutation = () => {
  return useMutation({
    mutationFn: ResetLinkFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Reset link sent to your email"
      );
    },

    onError: (error: any) => {
      console.log("Reset link error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to send reset link"
      );
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ResetPasswordFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Password reset successful"
      );
    },

    onError: (error: any) => {
      console.log("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password"
      );
    },
  });
};