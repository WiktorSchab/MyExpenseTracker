import { useEffect, useState } from "react";
import "./App.css";

import { transactions as initialTransactions } from "./Data/transactions";

import TransactionList from "./Components/TransactionList";
import ControlPanel from "./Components/ControlPanel";
import Balance from "./Components/Balance";
import Header from "./Components/Header";

function App() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);

  // Filtering data to show only transactions in selected month
  useEffect(() => {
    const yearAndMonth = date.toISOString().slice(0, 7);

    const transactionInMonth = transactions.filter(
      (transaction) => transaction.date.slice(0, 7) === yearAndMonth,
    );

    setFilteredTransactions(transactionInMonth);
  }, [date, transactions]);

  return (
    <div className="text-whitept-2 relative h-auto min-h-[850px] w-[900px] bg-blue-500 px-5">
      <Header date={date} setDate={setDate} />

      <Balance transactions={filteredTransactions} />

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
