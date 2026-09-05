// src/models/Transaction.ts
import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
  type: "expense" | "salary";
  amount: number;
  category?: string;       // only for expense
  description?: string;    // only for expense
  source?: string;         // only for salary
  dateReceived?: Date;     // only for salary
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["expense", "salary"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Other"],
      required: function (this: ITransaction) {
        return this.type === "expense";
      },
    },
    description: String,
    source: {
      type: String,
      enum: ["Job", "Freelance", "Business", "Other"],
      required: function (this: ITransaction) {
        return this.type === "salary";
      },
    },
    dateReceived: Date,
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);