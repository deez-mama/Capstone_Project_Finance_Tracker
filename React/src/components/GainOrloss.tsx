import { Box } from "@mui/material";
import TransactionList from "./TransactionList";
import type { Transaction } from "../schema/transaction";
import { api } from "../api/axios";

interface GainorLossProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function GainorLoss({ transactions, setTransactions }: GainorLossProps) {
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  return (
      <Box sx={{ mt: 3 }}>
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </Box>
  );
}