import type { Transaction } from "../schema/transaction";

interface DashboardProps {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: DashboardProps) {
  const { totalIncome, totalExpense } = transactions.reduce(
    (acc, t) => {
      if (t.type === "salary") {
        acc.totalIncome += t.amount;
      } else {
        acc.totalExpense += t.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const netBalance = totalIncome - totalExpense;

  return (
    <div>
      <div>
        <p>Total Income</p>
        <p>+{totalIncome}</p>
      </div>
      <div>
        <p>Total Expenses</p>
        <p>-{totalExpense}</p>
      </div>
      <div>
        <p>Net Balance</p>
        <p>{netBalance}</p>
      </div>
    </div>
  );
}
