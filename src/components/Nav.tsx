import { Link } from "react-router-dom";
 
export default function Nav() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      {" | "}
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
}