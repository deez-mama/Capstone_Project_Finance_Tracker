import { useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import AddExpenseForm from "./Expenditure";
import AddSalaryForm from "./Earning";
import TransactionList from "./TransactionList";
import type { Transaction } from "../schema/transaction";
import type { ExpenseFormData } from "../schema/expenseSchema";
import type { SalaryFormData } from "../schema/salarySchema";

interface GainorLossProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function GainorLoss({
  transactions,
  setTransactions,
}: GainorLossProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleAddExpense = (data: ExpenseFormData) => {
    const newTransaction: Transaction = {
      type: "expense",
      id: crypto.randomUUID(),
      ...data,
    };
    setTransactions((prev) => [...prev, newTransaction]);
    setActive(null); // closes the form after submit
  };

  const handleAddSalary = (data: SalaryFormData) => {
    const newTransaction: Transaction = {
      type: "salary",
      id: crypto.randomUUID(),
      ...data,
    };
    setTransactions((prev) => [...prev, newTransaction]);
    setActive(null);
    
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
        <TransactionList transactions={transactions} />
      </Box>
    </Box>
  );
}


