import type { Transaction } from "../schema/transaction";
 
interface TransactionListProps {
  transactions: Transaction[];
}
 
export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }
 
  return (
    <ul>
      {transactions.map((t) =>
        t.type === "expense" ? (
          <li key={t.id}>
            Expense: -{t.amount} ({t.category})
          </li>
        ) : (
          <li key={t.id}>
            Salary: +{t.amount} ({t.source})
          </li>
        )
      )}
    </ul>
  );
}