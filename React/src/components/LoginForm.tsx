import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schema/loginSchema";
import { api } from "../api/axios";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    console.log("submitting", data);
    setError(null);
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.token); // saves to context + localStorage
      navigate("/"); // send them to the Dashboard
    } catch (err) {
      setError("Invalid email or password");
      console.log("Login failed: ", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 8,
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button component={Link} to="/register">
        Don't have an account? Register
      </Button>
      <Button type="submit" variant="contained">
        Log In
      </Button>
    </Box>
  );
}
