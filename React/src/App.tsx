import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GainorLoss from "./components/GainOrloss";
import Dashboard from "./components/Dashboard";
import type { Transaction } from "./schema/transaction";
import Nav from "./components/Nav";
import { api } from "./api/axios";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get<Transaction[]>("/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
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
    </BrowserRouter>
  );
}