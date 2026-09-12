import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { registerSchema, type RegisterFormData } from "../schema/registerSchema";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

const onSubmit = async (data: RegisterFormData) => {
  setError(null);
  try {
    await api.post("/auth/register", data);
    navigate("/login"); // registration doesn't return a token, so send them to log in
  } catch (err) {
    setError("Could not register — email may already be in use");
  }
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 8 }}
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
      <Button type="submit" variant="contained">
        Register
      </Button>
    </Box>
  );
}