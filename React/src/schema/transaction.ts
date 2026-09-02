import { type ExpenseFormData } from "./expenseSchema";
import { type SalaryFormData } from "./salarySchema";

export type Transaction =
  | ({ type: "expense"; id: string } & ExpenseFormData)
  | ({ type: "salary"; id: string } & SalaryFormData);
