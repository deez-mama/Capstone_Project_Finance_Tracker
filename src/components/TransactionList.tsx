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
} from "@mui/material";
import type { Transaction } from "../schema/transaction";
 
interface TransactionListProps {
  transactions: Transaction[];
}
 
export default function TransactionList({ transactions }: TransactionListProps) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}