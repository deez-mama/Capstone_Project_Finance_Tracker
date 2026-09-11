import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Button component={Link} to="/" color="inherit">
          Dashboard
        </Button>
        <Button component={Link} to="/transactions" color="inherit">
          Transactions
        </Button>

        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout} sx={{ ml: "auto" }}>
            Log Out
          </Button>
        ) : (
          <Button component={Link} to="/login" color="inherit" sx={{ ml: "auto" }}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}