import { useState } from "react";
import PropTypes from "prop-types";

import ExpenseItem from "./ExpenseItem";
import AddRecordForm from "./AddRecordForm";

function TransactionList({
  transactions,
  setTransactions,
  filteredTransactions,
}) {
  console.log(filteredTransactions);
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // For opening/closing form
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
    const filteredTransaction = filteredTransactions.filter(
      (_, index) => index === recordId,
    );
    console.log(filteredTransaction);

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
    const updatedTransactions = filteredTransactions.filter(
      (_, id) => id !== recordId,
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
    </>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      valueType: PropTypes.string,
      value: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
    }),
  ),
  setTransactions: PropTypes.func,
  filteredTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      valueType: PropTypes.string,
      value: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
    }),
  ),
};

export default TransactionList;
