import { type ExpenseFormData } from "./expenseSchema";
import { type SalaryFormData } from "./salarySchema";

export type Transaction =
  | ({ type: "expense"; _id: string } & ExpenseFormData)
  | ({ type: "salary"; _id: string } & SalaryFormData);
