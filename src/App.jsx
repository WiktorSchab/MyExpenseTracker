import { useState } from "react";
import "./App.css";

import { transactions as initialTransactions } from "./Data/transactions";

import TransactionList from "./Components/TransactionList";
import ControlPanel from "./Components/ControlPanel";
import Balance from "./Components/Balance";

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);

  return (
    <div className="text-whitept-2 relative h-auto min-h-[850px] w-[900px] bg-blue-500 px-5">
      <Balance />

      <ControlPanel
        transactions={transactions}
        setFilteredTransactions={setFilteredTransactions}
      />

      <TransactionList
        transactions={transactions}
        filteredTransactions={filteredTransactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;
