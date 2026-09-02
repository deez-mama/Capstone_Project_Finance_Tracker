import { z } from "zod";

export const salarySchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  source: z.enum(["Job", "Freelance", "Business", "Other"], {
    message: "Please select a category",
  }),
  dateReceived: z.string().optional(),
});

export type SalaryFormData = z.infer<typeof salarySchema>;
