import { useState } from "react";
import Expenditure from "./Expenditure";
import Earning from "./Earning";

export default function GainorLoss() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <button onClick={() => setActive("Earn")}>Add Earning </button>
      <button onClick={() => setActive("Spent")}>Add Expenditure </button>

      {active === "Earn" && <Earning />}
      {active === "Spent" && <Expenditure />}
      {/* Only load this particular component when active has that value and it can only be set when clicking the button */}
    </div>
  );
}
