import { Request, Response } from "express";
import Transaction from "../models/Transaction";

// GET /api/transactions
export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json(transactions);
};

// POST /api/transactions
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req: Request, res: Response) => {
  const deleted = await Transaction.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Transaction not found" });
  res.json({ message: "Deleted", id: req.params.id });
};