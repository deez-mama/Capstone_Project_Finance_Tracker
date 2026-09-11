import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  type: "expense" | "salary";
  amount: number;
  category?: string; // only for expense
  description?: string; // only for expense
  source?: string; // only for salary
  dateReceived?: Date; // only for salary
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // assumes your user model is registered as "User"
      required: true,
    },
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
      enum: [
        "Food",
        "Transport",
        "Rent",
        "Utilities",
        "Entertainment",
        "Other",
      ],
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
  { timestamps: true },
);

export default model<ITransaction>("Transaction", transactionSchema);
