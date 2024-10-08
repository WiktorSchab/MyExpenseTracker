import { useState } from "react";
import PropTypes from "prop-types";

import ExpenseItem from "./ExpenseItem";
import AddRecordForm from "./AddRecordForm";
import { transactionShape } from "../Lib/types";

function TransactionList({
  transactions,
  setTransactions,
  filteredTransactions,
  setTitle,
  availableId,
}) {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // For opening/closing form
  const handleAddClick = () => {
    setIsFormDisplayed(true);
    setEditRecord(null);
    setTitle("Adding transaction ➕💼");
  };
  const handleCloseForm = () => {
    setIsFormDisplayed(false);
    setTitle("MyExpensesTracker");
  };

  const handleAddRecord = (newRecord) => {
    setTransactions([...transactions, newRecord]);
    setIsFormDisplayed(false);
    setTitle("Adding transaction ➕💼");
  };

  const handleEditRecord = (recordId) => {
    // Get the single record based on the recordId
    const filteredTransaction = transactions.filter(
      (transactions) => transactions.id === recordId,
    );

    setEditRecord(filteredTransaction);
    setIsFormDisplayed(true);
    setTitle("Editing transaction ✏️💼");
  };

  const finalizeEditRecord = (editedRecord) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editedRecord.id ? editedRecord : transaction,
    );
    setTransactions(updatedTransactions);
    setIsFormDisplayed(false);
  };

  const handleDeleteRecord = (recordId) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== recordId,
    );
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
    <>
      {/* List of expenses and earnings */}
      <div className="flex justify-center">
        <ul className="mt-2 flex h-[372px] w-[85%] flex-col gap-2 overflow-auto bg-blue-200 p-2">
          {filteredTransactions.map((transaction, index) => (
            <ExpenseItem
              key={index}
              id={transaction.id}
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
          availableId={availableId}
        />
      ) : (
        renderAddButton()
      )}
    </>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape),
  setTransactions: PropTypes.func,
  filteredTransactions: PropTypes.arrayOf(transactionShape),
  setTitle: PropTypes.func,
  availableId: PropTypes.number,
};

export default TransactionList;
