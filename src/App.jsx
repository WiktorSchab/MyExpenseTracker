import { useEffect, useState } from "react";
import "./App.css";

import { transactions as initialTransactions } from "./Data/transactions";

import TransactionList from "./Components/TransactionList";
import ControlPanel from "./Components/ControlPanel";
import Balance from "./Components/Balance";
import Header from "./Components/Header";

function App() {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("MyExpensesTracker");

  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);
  const [sortedTransactions, setSortedTransactions] =
    useState(initialTransactions);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Filtering data to show only transactions in selected month
  useEffect(() => {
    const yearAndMonth = date.toISOString().slice(0, 7);

    const transactionInMonth = transactions.filter(
      (transaction) => transaction.date.slice(0, 7) === yearAndMonth,
    );

    setFilteredTransactions(transactionInMonth);
  }, [date, transactions]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[900px] w-[1440px] bg-blue-500 px-5 text-white">
        <Header date={date} setDate={setDate} />

        <Balance dateOfData={date} transactions={filteredTransactions} />

        <ControlPanel
          transactions={transactions}
          setFilteredTransactions={setFilteredTransactions}
          setSortedTransactions={setSortedTransactions}
        />

        <TransactionList
          transactions={transactions}
          filteredTransactions={sortedTransactions}
          setTransactions={setTransactions}
          setTitle={setTitle}
        />
      </div>
    </div>
  );
}

export default App;
