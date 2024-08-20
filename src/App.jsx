import { useEffect, useState } from "react";
import "./App.css";

import { transactions as defaultTransactions } from "./Data/transactions";

import TransactionList from "./Components/TransactionList";
import ControlPanel from "./Components/ControlPanel";
import Balance from "./Components/Balance";
import Header from "./Components/Header";

function App() {
  //reset
  //localStorage.setItem("transactions", null);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("MyExpensesTracker");

  // Loading saved data
  // !! defaultTransactions will be deleted in prod !!
  const initialTransactions =
    JSON.parse(localStorage.getItem("transactions")) || defaultTransactions;

  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);
  const [sortedTransactions, setSortedTransactions] =
    useState(initialTransactions);

  let availableId = transactions[transactions.length - 1].id + 1;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Saving transactions data on local storage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Filtering data to show only transactions in selected month
  useEffect(() => {
    const yearAndMonth = date.toISOString().slice(0, 7);

    const transactionInMonth = transactions.filter(
      (transaction) => transaction.date.slice(0, 7) === yearAndMonth,
    );

    setFilteredTransactions(transactionInMonth);
  }, [date, transactions]);
  console.log(transactions, filteredTransactions, sortedTransactions);
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[900px] w-[1440px] bg-blue-500 px-5 text-white">
        <Header date={date} setDate={setDate} />
        <Balance dateOfData={date} transactions={filteredTransactions} />
        <ControlPanel
          transactions={transactions}
          setFilteredTransactions={setFilteredTransactions}
          setSortedTransactions={setSortedTransactions}
          date={date}
        />

        <TransactionList
          transactions={transactions}
          filteredTransactions={sortedTransactions}
          setTransactions={setTransactions}
          setTitle={setTitle}
          availableId={availableId}
        />
      </div>
    </div>
  );
}

export default App;
