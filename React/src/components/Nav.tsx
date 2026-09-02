import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function Nav() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Button component={Link} to="/" color="inherit">
          Dashboard
        </Button>
        <Button component={Link} to="/transactions" color="inherit">
          Transactions
        </Button>
      </Toolbar>
    </AppBar>
  );
}