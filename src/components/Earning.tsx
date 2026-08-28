import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { salarySchema } from "../schema/salarySchema";
import type { SalaryFormData } from "../schema/salarySchema";

function AddSalaryForm({
  onAddSalary,
}: {
  onAddSalary: (data: SalaryFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SalaryFormData>({
    resolver: zodResolver(salarySchema),
  });

  const onSubmit = (data: SalaryFormData) => {
    onAddSalary(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField
          label="Amount"
          type="number"
          slotProps={{ htmlInput: { step: "0.01" } }}
          {...register("amount", { valueAsNumber: true })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          fullWidth
        />

        <TextField
          select
          label="Source"
          defaultValue=""
          {...register("source")}
          error={!!errors.source}
          helperText={errors.source?.message}
          fullWidth
        >
          <MenuItem value="">Select source</MenuItem>
          <MenuItem value="Job">Job</MenuItem>
          <MenuItem value="Freelance">Freelance</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Date Received (optional)"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("dateReceived")}
          error={!!errors.dateReceived}
          helperText={errors.dateReceived?.message}
          fullWidth
        />

        <Button type="submit" variant="contained">
          Add Salary
        </Button>
      </Stack>
    </form>
  );
}

export default AddSalaryForm;
