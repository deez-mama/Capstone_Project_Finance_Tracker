import { useState } from "react";
import { Card, CardContent, Typography, Stack, Button, Box } from "@mui/material";
import AddExpenseForm from "./Expenditure";
import AddSalaryForm from "./Earning";
import type { Transaction } from "../schema/transaction";
import type { ExpenseFormData } from "../schema/expenseSchema";
import type { SalaryFormData } from "../schema/salarySchema";
import { api } from "../api/axios";

interface DashboardProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function Dashboard({ transactions, setTransactions }: DashboardProps) {
  const [active, setActive] = useState<string | null>(null);

  const { totalIncome, totalExpense } = transactions.reduce(
    (acc, t) => {
      if (t.type === "salary") acc.totalIncome += t.amount;
      else acc.totalExpense += t.amount;
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );
  const netBalance = totalIncome - totalExpense;

  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      const res = await api.post<Transaction>("/transactions", { type: "expense", ...data });
      setTransactions((prev) => [...prev, res.data]);
      setActive(null);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const handleAddSalary = async (data: SalaryFormData) => {
    try {
      const res = await api.post<Transaction>("/transactions", { type: "salary", ...data });
      setTransactions((prev) => [...prev, res.data]);
      setActive(null);
    } catch (err) {
      console.error("Failed to add salary:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Total Income</Typography>
            <Typography variant="h5" color="success.main">+{totalIncome}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Total Expenses</Typography>
            <Typography variant="h5" color="error.main">-{totalExpense}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Net Balance</Typography>
            <Typography variant="h5" color={netBalance >= 0 ? "success.main" : "error.main"}>
              {netBalance}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant={active === "Earn" ? "contained" : "outlined"} onClick={() => setActive("Earn")}>
          Add Salary
        </Button>
        <Button variant={active === "Spent" ? "contained" : "outlined"} onClick={() => setActive("Spent")}>
          Add Expense
        </Button>
      </Stack>

      {active === "Earn" && <AddSalaryForm onAddSalary={handleAddSalary} />}
      {active === "Spent" && <AddExpenseForm onAddExpense={handleAddExpense} />}
    </Box>
  );
}