import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { expenseSchema } from "../schema/expenseSchema";
import type { ExpenseFormData } from "../schema/expenseSchema";

function AddExpenseForm({
  onAddExpense,
}: {
  onAddExpense: (data: ExpenseFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: ExpenseFormData) => {
    onAddExpense(data);
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
          label="Category"
          defaultValue=""
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          fullWidth
        >
          <MenuItem value="">Select category</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Description (optional)"
          type="text"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
        />

        <Button type="submit" variant="contained">
          Add Expense
        </Button>
      </Stack>
    </form>
  );
}

export default AddExpenseForm;
