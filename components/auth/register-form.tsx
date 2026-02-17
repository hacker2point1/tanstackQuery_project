
"use client"
import { useSignUpMutation } from "@/customHooks/query/auth.query.hooks";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate, isPending } = useSignUpMutation();

    const onSubmit = (formData: { first_name: string; last_name: string; address: string; email: string; password: string; confirm_password: string; }) => {
        let Data = {
            "first_name": formData.first_name,
            "last_name": formData.last_name,
            "address": formData.address,
            "email": formData.email,
            "password": formData.password,
            "confirm_password": formData.confirm_password
        }
        mutate(Data);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {/* {isAuthenticated ? "Welcome Back!" : "Login Form"} */}
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                {...register("first_name", { required: "first name is required" })}
                                label="Firstname"
                                fullWidth
                                margin="normal"
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message}
                            />
                            <TextField
                                {...register("last_name", { required: "last name is required" })}
                                label="Lastname"
                                fullWidth
                                margin="normal"
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                            />
                            <TextField
                                {...register("address", { required: "address is required" })}
                                label="address"
                                fullWidth
                                margin="normal"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />


                            <TextField
                                {...register("email", { required: "Email is required" })}
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                {...register("password", { required: "Password is required" })}
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <TextField
                                {...register("confirm_password", { required: "Confirm Password is required" })}
                                label="ConfirmPassword"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                sx={{ marginTop: 2 }}
                            >
                                {isPending ? "Loading..." : "Login"}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;