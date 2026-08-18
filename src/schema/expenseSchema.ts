import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.enum(
    ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Other"],
    {
      errorMap: () => ({ message: "Please select a category" }),
    },
  ),
  description: z.string().max(100, "Keep it under 100 characters").optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
