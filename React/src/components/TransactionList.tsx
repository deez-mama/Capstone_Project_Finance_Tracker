// TransactionList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Transaction } from "../schema/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <Typography color="text.secondary">No transactions yet.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Category / Source</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t._id}>
              <TableCell>
                <Chip
                  label={t.type === "expense" ? "Expense" : "Salary"}
                  color={t.type === "expense" ? "error" : "success"}
                  size="small"
                />
              </TableCell>
              <TableCell>{t.type === "expense" ? t.category : t.source}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color: t.type === "expense" ? "error.main" : "success.main",
                  fontWeight: 500,
                }}
              >
                {t.type === "expense" ? "-" : "+"}
                {t.amount}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onDelete(t._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}