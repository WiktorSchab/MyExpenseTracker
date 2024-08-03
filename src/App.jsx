import { useState } from "react";
import "./App.css";
import ExpenseItem from "./Components/ExpenseItem";
import { transactions } from "./Data/transactions";
import AddRecordForm from "./Components/AddRecordForm";

function App() {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const handleAddClick = () => setIsFormDisplayed(true);
  const handleCloseForm = () => setIsFormDisplayed(false);

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
        <button>sort</button>

        {/*Show only expenses/earnings (toogle) */}
        <button>Show expenses </button>
      </div>

      {/* List of expenses and earnings */}
      <div className="flex justify-center">
        <ul className="mt-2 flex h-[350px] w-[85%] flex-col gap-2 overflow-auto bg-blue-200 p-2">
          {transactions.map((transaction, index) => (
            <ExpenseItem
              key={index}
              valueType={transaction.valueType}
              value={transaction.value}
              description={transaction.description}
              type={transaction.type}
              category={transaction.category}
            />
          ))}
        </ul>
      </div>

      {/* Button to add new expenses */}
      {isFormDisplayed ? (
        <AddRecordForm onClose={handleCloseForm} />
      ) : (
        renderAddButton()
      )}
    </div>
  );
}

export default App;
