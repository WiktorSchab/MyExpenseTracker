import { useEffect, useState } from "react";
import "./App.css";
import ExpenseItem from "./Components/ExpenseItem";
import { transactions as initialTransactions } from "./Data/transactions";
import AddRecordForm from "./Components/AddRecordForm";

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  const [amountSorting, setAmountSorting] = useState(null);
  const [isDateSortDesc, setIsDateSortDesc] = useState(true);

  // useEffect for sorting
  useEffect(() => {
    const sortedTransactions = [...transactions];

    // Sorting by date
    if (isDateSortDesc) {
      sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (amountSorting === "desc") {
      sortedTransactions.sort((a, b) => a.value - b.value);
    } else if (amountSorting === "asc") {
      sortedTransactions.sort((a, b) => b.value - a.value);
    }

    setTransactions(sortedTransactions);

    console.log(amountSorting, isDateSortDesc);
  }, [amountSorting, isDateSortDesc]);

  const handleSortDateToggle = () => {
    setIsDateSortDesc((prevState) => !prevState);
  };

  const handleSortAmount = () => {
    if (!amountSorting) {
      setAmountSorting("asc");
    } else if (amountSorting === "asc") {
      setAmountSorting("desc");
    } else {
      setAmountSorting(null);
    }
  };

  const handleAddClick = () => {
    setIsFormDisplayed(true);
    setEditRecord(null);
  };
  const handleCloseForm = () => setIsFormDisplayed(false);

  const handleAddRecord = (newRecord) => {
    setTransactions([...transactions, newRecord]);
    setIsFormDisplayed(false);
  };

  const handleEditRecord = (recordId) => {
    // Get the single record based on the recordId
    const filteredTransaction = transactions.filter(
      (_, index) => index === recordId,
    );

    // Add the id to the record
    const transaction = {
      ...filteredTransaction,
      id: recordId,
    };

    setEditRecord(transaction);
    setIsFormDisplayed(true);
  };

  const finalizeEditRecord = (editedRecord, recordId) => {
    // Update the transaction at the specified index with the edited record
    const updatedTransactions = [...transactions];
    updatedTransactions[recordId] = editedRecord;

    setTransactions(updatedTransactions);
    setIsFormDisplayed(false);
  };

  const handleDeleteRecord = (recordId) => {
    const updatedTransactions = transactions.filter((_, id) => id !== recordId);
    setTransactions(updatedTransactions);
  };

  const renderAddButton = () => {
    return (
      <button
        onClick={handleAddClick}
        className="small-round-button absolute bottom-0 right-0 m-2"
      >
        Add
      </button>
    );
  };

  return (
    <div className="text-whitept-2 relative h-auto min-h-[850px] w-[900px] bg-blue-500 px-5">
      <h1 className="mb-2 mt-5">Monthly expenses</h1>
      <hr />

      {/* Sum of montly expenses and chart */}
      <div className="flex flex-col items-center">
        <h3 className="mb-2 mt-2">Balance: 3000$</h3>
        <div className="h-[300px] w-[300px] bg-blue-200"></div>
      </div>

      {/* Buttons for filtering etc */}
      <div className="mt-3 flex justify-end gap-3">
        {/* Slider for money range? (idk how to name it)  */}
        <div>there will be slider</div>

        {/* Button that shows sorting options by date/amount */}
        <div className="group relative flex">
          <button>Sort By</button>
          <ul className="absolute top-11 hidden w-[100%] rounded-md bg-blue-400 text-lg group-hover:block">
            <li className="blue-li rounded-t-lg" onClick={handleSortAmount}>
              Amount{" "}
              {amountSorting === "asc"
                ? "↑"
                : amountSorting === "desc"
                  ? "↓"
                  : ""}
            </li>
            <li
              className="blue-li rounded-b-lg border-t-[0px]"
              onClick={handleSortDateToggle}
            >
              Date {isDateSortDesc ? "↓" : "↑"}
            </li>
          </ul>
        </div>

        {/*Show only expenses/earnings (toogle) */}
        <button>Show expenses </button>
      </div>

      {/* List of expenses and earnings */}
      <div className="flex justify-center">
        <ul className="mt-2 flex h-[350px] w-[85%] flex-col gap-2 overflow-auto bg-blue-200 p-2">
          {transactions.map((transaction, index) => (
            <ExpenseItem
              key={index}
              id={index}
              valueType={transaction.valueType}
              value={transaction.value}
              description={transaction.description}
              type={transaction.type}
              category={transaction.category}
              date={transaction.date}
              onEditFunc={handleEditRecord}
              onDelFunc={handleDeleteRecord}
            />
          ))}
        </ul>
      </div>

      {/* Button to add new expenses */}
      {isFormDisplayed ? (
        <AddRecordForm
          onClose={handleCloseForm}
          onAddRecord={handleAddRecord}
          onEditRecord={finalizeEditRecord}
          recordToEdit={editRecord}
        />
      ) : (
        renderAddButton()
      )}
    </div>
  );
}

export default App;
