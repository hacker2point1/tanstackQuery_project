// "use client"

// import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
// import { useForm } from "react-hook-form"
// import styles from "../auth/otp.module.css"

// const Otp: React.FC = () => {

//   const userId =
//     typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   const email =
//     typeof window !== "undefined" ? localStorage.getItem("email") : null;

//   const { handleSubmit } = useForm();
//   const { mutate, isPending } = useOtpMutation();

//   const handleChange = (e: any, index: number) => {
//     const value = e.target.value.replace(/\D/g, "").slice(-1);
//     e.target.value = value;

//     if (value) {
//       const next = document.getElementById(`otp-${index + 1}`);
//       if (next) next.focus();
//     }
//   };

//   const onSubmit = () => {
//     let otpValue = "";

//     for (let i = 0; i < 6; i++) {
//       const box = document.getElementById(`otp-${i}`) as HTMLInputElement;
//       if (box) otpValue += box.value;
//     }

//     const data = {
//       userId,
//       otp: otpValue,
//     };

//     mutate(data);
//   };

//   return (
//   <div className={styles.container}>
//     <div className={styles.card}>
//       <h2 className={styles.title}>OTP Verification</h2>

//       <p className={styles.subtitle}>
//         OTP sent to <strong>{email}</strong>
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={styles.otpWrapper}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               maxLength={1}
//               onChange={(e) => handleChange(e, index)}
//               className={styles.otpInput}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           disabled={isPending}
//           className={styles.button}
//         >
//           {isPending ? "Verifying..." : "Verify OTP"}
//         </button>
//       </form>
//     </div>
//   </div>
// );
// };

// export default Otp;

"use client";

import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import styles from "../auth/otp.module.css";

const Otp: React.FC<{
  onClose?: () => void;
  onSuccess?: () => void;
  redirectToSignIn?: boolean;
}> = ({ onClose, onSuccess, redirectToSignIn = true }) => {
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("email")
      : null;

  const { handleSubmit } = useForm();
  const { mutate, isPending } = useOtpMutation({
    redirectToSignIn,
    onSuccess,
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Handle typing
  const handleChange = (e: any, index: number) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Auto backspace support
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Auto paste full OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasteData.split("").forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
      }
    });

    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputsRef.current[nextIndex]?.focus();
  };

  const onSubmit = () => {
    const otpValue = inputsRef.current
      .map((input) => input?.value || "")
      .join("");

    const Data = {
      userId,
      otp: otpValue,
    };

    mutate(Data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>OTP Verification</h2>

        <p className={styles.subtitle}>
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.otpWrapper}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={styles.otpInput}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={styles.button}
          >
            {isPending ? (
              <span className={styles.spinner}></span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;