import PropTypes from "prop-types";
import FormField from "./FormField";
import RadioButton from "./RadioButton";
import { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "../Data/categories";

function AddRecordForm({ onClose, onAddRecord, onEditRecord, recordToEdit }) {
  const [isExpense, setIsExpense] = useState(true);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [amountError, setAmountError] = useState("");

  const optionsToShow = isExpense ? expenseCategories : incomeCategories;

  useEffect(() => {
    if (recordToEdit) {
      const record = recordToEdit[0];
      setIsExpense(record.valueType === "-");
      setAmount(record.value);
      setDescription(record.description);
      setCategory(record.category);
    }
  }, [recordToEdit]);

  const prepareData = () => {
    const newRecord = {
      valueType: isExpense ? "-" : "+",
      value: parseFloat(amount),
      description,
      type: isExpense ? "Expense" : "Income",
      category,
    };

    if (!recordToEdit) {
      onAddRecord(newRecord);
    } else {
      onEditRecord(newRecord, recordToEdit.id);
    }
  };

  const handleRadioChange = (expense) => {
    setIsExpense(expense);
    setCategory("");
  };

  const amountValidation = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);

    setAmount(value);

    if (isNaN(floatValue) || floatValue.toString() !== value) {
      setAmountError("Error! You have to provide a number.");
    } else if (floatValue <= 0) {
      setAmountError("Error! You have to provide a positive number.");
    } else {
      setAmountError("");
    }
  };

  return (
    <div className="slide-in absolute bottom-0 left-0 h-[40%] w-[100%] bg-cyan-700">
      <div className="w-[100%]bg-blue-500 relative h-[100%]">
        <button
          onClick={onClose}
          className="small-round-button absolute right-0 top-0"
        >
          ✕
        </button>

        <div className="flex w-[90%] flex-col gap-3 p-5">
          <FormField
            id="amount-field"
            label="Amount"
            placeholder="95"
            maxLength={16}
            value={amount.toString()}
            onChange={amountValidation}
            validationError={amountError}
          />

          <FormField
            id="description-field"
            label="Description"
            placeholder="Movie Night"
            maxLength={48}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-row gap-5">
            <RadioButton
              id="expense"
              name="category"
              value="-"
              labelValue="Expense"
              onClick={() => handleRadioChange(true)}
              isChecked={isExpense}
            />
            <RadioButton
              id="income"
              name="category"
              value="+"
              labelValue="Income"
              onClick={() => handleRadioChange(false)}
              isChecked={!isExpense}
            />
          </div>

          <div className="flex justify-between">
            <div className="row flex w-[50%] items-center gap-5">
              <select
                id="select-category"
                className="block w-[50%] rounded-lg border bg-gray-50 px-2.5 py-1.5 text-gray-900"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  {isExpense ? "Expense" : "Income"}
                </option>

                {optionsToShow.map((value, id) => (
                  <option key={id} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label htmlFor="select-category">Category</label>
            </div>
            <button
              className="box-border p-2 pl-5 pr-5 text-sm"
              onClick={prepareData}
            >
              {recordToEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddRecordForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddRecord: PropTypes.func.isRequired,
  onEditRecord: PropTypes.func.isRequired,
  recordToEdit: PropTypes.shape({
    id: PropTypes.number,
    valueType: PropTypes.string,
    value: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default AddRecordForm;
