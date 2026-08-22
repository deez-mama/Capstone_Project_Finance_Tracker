import { useState } from "react";
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
    <div>
      <button onClick={() => setActive("Earn")}>Add Earning </button>
      <button onClick={() => setActive("Spent")}>Add Expenditure </button>

      {active === "Earn" && <AddSalaryForm onAddSalary={handleAddSalary} />}
      {active === "Spent" && <AddExpenseForm onAddExpense={handleAddExpense} />}
      {/* Only load this particular component when active has that value and it can only be set when clicking the button */}

      <TransactionList transactions={transactions}/>
    </div>
  );
}


