import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salarySchema } from "../schema/salarySchema";
import type { SalaryFormData } from "../schema/salarySchema";

function AddSalaryForm({ onAddSalary }: { onAddSalary: (data: SalaryFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SalaryFormData>({
    resolver: zodResolver(salarySchema),
  });

  const onSubmit = (data: SalaryFormData) => {
    onAddSalary(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>

      <div>
        <label>Source</label>
        <select {...register("source")}>
          <option value="">Select source</option>
          <option value="Job">Job</option>
          <option value="Freelance">Freelance</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>
        {errors.source && <p>{errors.source.message}</p>}
      </div>

      <div>
        <label>Date Received (optional)</label>
        <input type="date" {...register("dateReceived")} />
        {errors.dateReceived && <p>{errors.dateReceived.message}</p>}
      </div>

      <button type="submit">Add Salary</button>
    </form>
  );
}

export default AddSalaryForm;