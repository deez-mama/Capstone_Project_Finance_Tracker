import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GainorLoss from "./components/GainOrloss";
import Dashboard from "./components/Dashboard";
import type { Transaction } from "./schema/transaction";
import Nav from "./components/Nav";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />
        <Route
          path="/transactions"
          element={
            <GainorLoss
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
      </Routes>
      <Nav />
    </BrowserRouter>
  );
}
