import { Card, CardContent, Typography, Stack } from "@mui/material";
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
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ p: 2 }}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            Total Income
          </Typography>
          <Typography variant="h5" color="success.main">
            +{totalIncome}
          </Typography>
        </CardContent>
      </Card>
 
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            Total Expenses
          </Typography>
          <Typography variant="h5" color="error.main">
            -{totalExpense}
          </Typography>
        </CardContent>
      </Card>
 
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            Net Balance
          </Typography>
          <Typography
            variant="h5"
            color={netBalance >= 0 ? "success.main" : "error.main"}
          >
            {netBalance}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
