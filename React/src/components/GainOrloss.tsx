import { useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import AddExpenseForm from "./Expenditure";
import AddSalaryForm from "./Earning";
import TransactionList from "./TransactionList";
import type { Transaction } from "../schema/transaction";
import type { ExpenseFormData } from "../schema/expenseSchema";
import type { SalaryFormData } from "../schema/salarySchema";
import { api } from "../api/axios";

interface GainorLossProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function GainorLoss({
  transactions,
  setTransactions,
}: GainorLossProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      const res = await api.post<Transaction>("/transactions", {
        type: "expense",
        ...data,
      });
      setTransactions((prev) => [...prev, res.data]);
      setActive(null);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const handleAddSalary = async (data: SalaryFormData) => {
    try {
      const res = await api.post<Transaction>("/transactions", {
        type: "salary",
        ...data,
      });
      setTransactions((prev) => [...prev, res.data]);
      setActive(null);
    } catch (err) {
      console.error("Failed to add salary:", err);
    }
  };

  const handleDelete = async (id: string) => {
  try {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  } catch (err) {
    console.error("Failed to delete transaction:", err);
  }
};

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={active === "Earn" ? "contained" : "outlined"}
          onClick={() => setActive("Earn")}
        >
          Add Salary
        </Button>
        <Button
          variant={active === "Spent" ? "contained" : "outlined"}
          onClick={() => setActive("Spent")}
        >
          Add Expense
        </Button>
      </Stack>

      {active === "Earn" && <AddSalaryForm onAddSalary={handleAddSalary} />}
      {active === "Spent" && <AddExpenseForm onAddExpense={handleAddExpense} />}

      <Box sx={{ mt: 3 }}>
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </Box>
    </Box>
  );
}