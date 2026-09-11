import { Response } from "express";
import Transaction from "../models/Transaction";
import { AuthRequest } from "../middleware/authMiddleware";

// GET /api/transactions
export const getTransactions = async (req: AuthRequest, res: Response) => {
  const transactions = await Transaction.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
  res.json(transactions);
};

// POST /api/transactions
export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const transaction = await Transaction.create({ ...req.body, userId: req.user!.userId });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user!.userId });
  if (!deleted) return res.status(404).json({ message: "Transaction not found" });
  res.json({ message: "Deleted", id: req.params.id });
};