"use client";

import { useSignInMutation } from "@/customHooks/query/auth.query.hooks";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ResetPasswordModal from "./resetPassword/resetPassword";
import { useState } from "react";

export default function LoginForm({
  onClose,
  onSwitch,
}: {
  onClose?: () => void;
  onSwitch?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const [openReset, setOpenReset] = useState(false);

  const { mutate, isPending } = useSignInMutation();

  const onSubmit = (formData: { email: string; password: string }) => {
    const Data = {
      email: formData.email,
      password: formData.password,
    };

    mutate(Data, {
      onSuccess: () => {
        // Close the modal (if provided) without navigating away
        onClose?.();
      },
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", { required: "Email is required" })}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />

        <TextField
          {...register("password", { required: "Password is required" })}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />

        <Button fullWidth size="large" type="submit" sx={{ mt: 2 }}>
          {isPending ? "Loading..." : "Login"}
        </Button>

        {/* 🔄 SWITCH */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <span
              onClick={onSwitch}
              style={{
                color: "#00A76F",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign Up
            </span>
          </Typography>
          <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: -1,
                }}
              >
                <Typography
                  fontSize="13px"
                  sx={{
                    cursor: "pointer",
                    color: "#1976d2",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => setOpenReset(true)}
                >
                  Forgot Password?
                </Typography>
              </Box>
        </Box>
      </form>
      <ResetPasswordModal
      open={openReset}
      handleClose={() => setOpenReset(false)}
    />
    </Stack>
    
  );
}

// "use client";

// import Link from "next/link";
// import { useSignInMutation } from "@/customHooks/query/auth.query.hooks";
// import {
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   Box,
// } from "@mui/material";
// import { useForm } from "react-hook-form";

// export default function LoginForm({ onClose }: { onClose?: () => void }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { mutate, isPending } = useSignInMutation();

//   const onSubmit = (formData: { email: string; password: string }) => {
//     const Data = {
//       email: formData.email,
//       password: formData.password,
//     };

//     mutate(Data);
//   };

//   return (
//     <Stack spacing={2}>
//       <Typography variant="h5" fontWeight={600}>
//         Login
//       </Typography>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           {...register("email", { required: "Email is required" })}
//           label="Email"
//           fullWidth
//           margin="normal"
//           error={!!errors.email}
//           helperText={errors.email?.message as string}
//         />

//         <TextField
//           {...register("password", {
//             required: "Password is required",
//           })}
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           error={!!errors.password}
//           helperText={errors.password?.message as string}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           size="large"
//           type="submit"
//           sx={{ mt: 2 }}
//         >
//           {isPending ? "Loading..." : "Login"}
//         </Button>

//         {/* 🔥 SIGN UP LINE */}
//         <Box textAlign="center" mt={2}>
//           <Typography variant="body2" color="text.secondary">
//             Don’t have an account?{" "}
//             <Typography
//               component={Link}
//               href="/auth/signUp"
//               sx={{
//                 display: "inline",
//                 fontWeight: 600,
//                 color: "#00A76F",
//                 textDecoration: "none",
//                 cursor: "pointer",

//                 "&:hover": {
//                   textDecoration: "underline",
//                 },
//               }}
//             >
//               Sign Up
//             </Typography>
//           </Typography>
//         </Box>
//       </form>
//     </Stack>
//   );
// }





// "use client";

// import { useSignInMutation } from "@/customHooks/query/auth.query.hooks";
// import {
//   Button,
//   Container,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useForm } from "react-hook-form";

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { mutate, isPending } = useSignInMutation();

//   const onSubmit = (formData: { email: string; password: string }) => {
//     const Data = {
//       email: formData.email,
//       password: formData.password,
//     };

//     mutate(Data);
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h5" gutterBottom>
//               Login
//             </Typography>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <TextField
//                 {...register("email", { required: "Email is required" })}
//                 label="Email"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />

//               <TextField
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />

//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 type="submit"
//                 sx={{ marginTop: 2 }}
//               >
//                 {isPending ? "Loading..." : "Login"}
//               </Button>
//             </form>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Login;