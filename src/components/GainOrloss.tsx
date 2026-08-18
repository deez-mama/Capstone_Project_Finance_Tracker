import { useState } from "react";
import AddExpenseForm from "./Expenditure";
import Earning from "./Earning";

export default function GainorLoss() {
  const [active, setActive] = useState<string | null>(null);

  const handleAddExpense = (data: {
    amount: number;
    category:
      | "Food"
      | "Transport"
      | "Rent"
      | "Utilities"
      | "Entertainment"
      | "Other";
    description?: string;
  }) => {
    console.log("Expense added:", data);
  };

  return (
    <div>
      <button onClick={() => setActive("Earn")}>Add Earning </button>
      <button onClick={() => setActive("Spent")}>Add Expenditure </button>

      {active === "Earn" && <Earning />}
      {active === "Spent" && <AddExpenseForm onAddExpense={handleAddExpense} />}
      {/* Only load this particular component when active has that value and it can only be set when clicking the button */}
    </div>
  );
}
