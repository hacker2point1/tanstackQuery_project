"use client";

import { useSignUpMutation } from "@/customHooks/query/auth.query.hooks";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function RegisterForm({
  onClose,
  onSwitch,
  onOtp,
}: {
  onClose?: () => void;
  onSwitch?: () => void; // 🔥 will switch to OTP
  onOtp?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useSignUpMutation();

//   const onSubmit = (formData: any) => {
//     mutate(formData, {
//       onSuccess: () => {
//         onSwitch?.(); //  go to OTP instead of closing modal
//       },
//     });
//   };


const onSubmit = (formData: any) => {
  mutate(formData, {
    onSuccess: () => {
      onOtp?.(); //otp modal redirection
    },
  });
};

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("first_name", { required: "First name is required" })}
          label="First Name"
          fullWidth
          margin="normal"
          error={!!errors.first_name}
          helperText={errors.first_name?.message as string}
        />

        <TextField
          {...register("last_name", { required: "Last name is required" })}
          label="Last Name"
          fullWidth
          margin="normal"
          error={!!errors.last_name}
          helperText={errors.last_name?.message as string}
        />

        <TextField
          {...register("address", { required: "Address is required" })}
          label="Address"
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address?.message as string}
        />

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

        <TextField
          {...register("confirm_password", {
            required: "Confirm Password is required",
          })}
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message as string}
        />

        <Button fullWidth size="large" type="submit" sx={{ mt: 2 }}>
          {isPending ? "Loading..." : "Register"}
        </Button>

        {/*  SWITCH TO LOGIN */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <span
              onClick={onSwitch}
              style={{
                color: "#00A76F",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </form>
    </Stack>
  );
}



// "use client";

// import { useSignUpMutation } from "@/customHooks/query/auth.query.hooks";
// import {
//   Button,
//   Container,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import Link from "next/link";
// import { useForm } from "react-hook-form";

// const Register: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { mutate, isPending } = useSignUpMutation();

//   const onSubmit = (formData: {
//     first_name: string;
//     last_name: string;
//     address: string;
//     email: string;
//     password: string;
//     confirm_password: string;
//   }) => {
//     let Data = {
//       first_name: formData.first_name,
//       last_name: formData.last_name,
//       address: formData.address,
//       email: formData.email,
//       password: formData.password,
//       confirm_password: formData.confirm_password,
//     };

//     mutate(Data);
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h5" gutterBottom>
//               Register
//             </Typography>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <TextField
//                 {...register("first_name", {
//                   required: "First name is required",
//                 })}
//                 label="Firstname"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.first_name}
//                 helperText={errors.first_name?.message as string}
//               />

//               <TextField
//                 {...register("last_name", {
//                   required: "Last name is required",
//                 })}
//                 label="Lastname"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.last_name}
//                 helperText={errors.last_name?.message as string}
//               />

//               <TextField
//                 {...register("address", {
//                   required: "Address is required",
//                 })}
//                 label="Address"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.address}
//                 helperText={errors.address?.message as string}
//               />

//               <TextField
//                 {...register("email", {
//                   required: "Email is required",
//                 })}
//                 label="Email"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.email}
//                 helperText={errors.email?.message as string}
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
//                 helperText={errors.password?.message as string}
//               />

//               <TextField
//                 {...register("confirm_password", {
//                   required: "Confirm Password is required",
//                 })}
//                 label="Confirm Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.confirm_password}
//                 helperText={errors.confirm_password?.message as string}
//               />

//               <Button
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 type="submit"
//                 sx={{ mt: 2 }}
//               >
//                 {isPending ? "Loading..." : "Register"}
//               </Button>

//               {/* 🔥 SIGN IN LINK */}
//               <Typography
//                 variant="body2"
//                 sx={{
//                   mt: 2,
//                   textAlign: "center",
//                   color: "#637381",
//                 }}
//               >
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/signIn"
//                   style={{
//                     color: "#00A76F",
//                     fontWeight: 600,
//                     textDecoration: "none",
//                   }}
//                 >
//                   Sign In
//                 </Link>
//               </Typography>
//             </form>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Register;