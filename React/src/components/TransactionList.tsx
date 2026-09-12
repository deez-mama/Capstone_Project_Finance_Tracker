import { Fragment, useState } from "react";
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
  Collapse,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type { Transaction } from "../schema/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (transactions.length === 0) {
    return <Typography color="text.secondary">No transactions yet.</Typography>;
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Type</TableCell>
            <TableCell>Category / Source</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => {
            const isExpanded = expandedId === t._id;
            const isExpense = t.type === "expense";
            const hasDetails = isExpense
              ? Boolean(t.description)
              : Boolean(t.dateReceived);

            return (
              <Fragment key={t._id}>
                <TableRow>
                  <TableCell sx={{ width: 40 }}>
                    {hasDetails && (
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(t._id)}
                      >
                        {isExpanded ? (
                          <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowDownIcon fontSize="small" />
                        )}
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={isExpense ? "Expense" : "Salary"}
                      color={isExpense ? "error" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{isExpense ? t.category : t.source}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: isExpense ? "error.main" : "success.main",
                      fontWeight: 500,
                    }}
                  >
                    {isExpense ? "-" : "+"}
                    {t.amount}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => onDelete(t._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ py: 0, border: isExpanded ? undefined : 0 }}
                  >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ py: 1, px: 2 }}>
                        {isExpense && t.description && (
                          <Typography variant="body2">
                            <strong>Description:</strong> {t.description}
                          </Typography>
                        )}
                        {!isExpense && t.dateReceived && (
                          <Typography variant="body2">
                            <strong>Date Received:</strong>{" "}
                            {new Date(t.dateReceived).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
