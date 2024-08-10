import { useEffect, useState } from "react";
import "./App.css";
import ExpenseItem from "./Components/ExpenseItem";
import { transactions as initialTransactions } from "./Data/transactions";
import AddRecordForm from "./Components/AddRecordForm";
import sortingUtils from "./Utils/sortingFunctions";

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(initialTransactions);

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // for sorting, filtering etc
  const [amountSorting, setAmountSorting] = useState(null);
  const [isDateSortDesc, setIsDateSortDesc] = useState(true);
  const [typeRecordFilter, setTypeRecordFilter] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  // useEffect for sorting and filtering
  useEffect(() => {
    let sortedTransactions = [...transactions];

    // Sorting by date
    sortingUtils.sortByDate(sortedTransactions, isDateSortDesc);

    // Sorting by amount
    if (amountSorting) {
      sortingUtils.sortByValue(sortedTransactions, amountSorting === "desc");
    }

    // Filtering by type (expenses/incomes)
    if (typeRecordFilter) {
      sortedTransactions = sortingUtils.filterByType(
        sortedTransactions,
        typeRecordFilter,
      );
    }

    // Filtering by min and max value
    if (minValue || maxValue) {
      sortedTransactions = sortingUtils.filterByMaxMinValue(
        sortedTransactions,
        minValue,
        maxValue,
      );
    }

    setFilteredTransactions(sortedTransactions);
  }, [
    amountSorting,
    isDateSortDesc,
    typeRecordFilter,
    minValue,
    maxValue,
    transactions,
  ]);

  const handleSortDateToggle = () => {
    setIsDateSortDesc((prevState) => !prevState);
  };

  const handleShowRecords = () => {
    if (!typeRecordFilter) {
      setTypeRecordFilter("expenses");
    } else if (typeRecordFilter === "expenses") {
      setTypeRecordFilter("incomes");
    } else {
      setTypeRecordFilter(null);
    }
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
        {/* Min/Max value range filter */}
        <div>
          <p>Value Range</p>
          <div className="flex gap-2">
            <input
              className="input-number w-[65px]"
              placeholder="min"
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
            <p>-</p>
            <input
              className="input-number w-[65px]"
              placeholder="max"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
        </div>

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
        <button onClick={handleShowRecords}>
          Show{" "}
          {typeRecordFilter === "expenses"
            ? "expenses"
            : typeRecordFilter === "incomes"
              ? "incomes"
              : "all"}
        </button>
      </div>

      {/* List of expenses and earnings */}
      <div className="flex justify-center">
        <ul className="mt-2 flex h-[350px] w-[85%] flex-col gap-2 overflow-auto bg-blue-200 p-2">
          {filteredTransactions.map((transaction, index) => (
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
