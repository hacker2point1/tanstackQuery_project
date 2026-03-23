"use client";

import OtpForm from "@/components/auth/otp";
import RegisterForm from "@/components/auth/register-form";
import LoginForm from "@/components/auth/signin-form";
import { useState } from "react";

export default function AuthSwitcher({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register" | "otp">("login");

  return (
    <>
      {mode === "login" && (
        <LoginForm
          onClose={onClose}
          onSwitch={() => setMode("register")}
        />
      )}

      {mode === "register" && (
        <RegisterForm
          onClose={onClose}
          onSwitch={() => setMode("login")}
          onOtp={() => setMode("otp")} 
        />
      )}

      {mode === "otp" && (
        <OtpForm
          onClose={onClose}
          onSuccess={() => setMode("login")}
          redirectToSignIn={false}
        />
      )}
    </>
  );
}