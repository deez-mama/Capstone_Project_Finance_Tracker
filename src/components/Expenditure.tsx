import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../schema/expenseSchema";
import type { ExpenseFormData } from "../schema/expenseSchema";

function AddExpenseForm({ onAddExpense }: { onAddExpense: (data: ExpenseFormData) => void }) {
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
      <div>
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>

      <div>
        <label>Category</label>
        <select {...register("category")}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label>Description (optional)</label>
        <input type="text" {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;