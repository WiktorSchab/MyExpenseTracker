import PropTypes from "prop-types";
import FormField from "./FormField";
import RadioButton from "./RadioButton";
import { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "../Data/categories";
import CheckBox from "./CheckBox";
import { transactionShape } from "../Lib/types";

function AddRecordForm({ onClose, onAddRecord, onEditRecord, recordToEdit }) {
  const [isExpense, setIsExpense] = useState(true);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [amountError, setAmountError] = useState(null);

  const [isDateVisible, setIsDateVisible] = useState(false);

  const optionsToShow = isExpense ? expenseCategories : incomeCategories;

  // Add every Error state variable to this array
  const errorsList = [amountError];

  // Checks if there is any errors
  const disableSend = errorsList.some((error) => error !== null);

  useEffect(() => {
    if (recordToEdit) {
      const record = recordToEdit[0];
      setIsExpense(record.valueType === "-");
      setAmount(record.value);
      setDescription(record.description);
      setCategory(record.category);
      setDate(record.date);
    }
  }, [recordToEdit]);

  const prepareData = () => {
    const newRecord = {
      valueType: isExpense ? "-" : "+",
      value: parseFloat(amount),
      description,
      type: isExpense ? "Expense" : "Income",
      category,
      date: date,
    };

    if (!recordToEdit) {
      onAddRecord(newRecord);
    } else {
      onEditRecord(newRecord, recordToEdit.id);
    }
  };

  const handleRadioChange = (expense) => {
    setIsExpense(expense);
    setCategory("Other");
  };

  const handleCheckBoxChange = () => {
    setIsDateVisible((prevState) => !prevState);
    // Reseting Date
    setDate(new Date().toISOString().split("T")[0]);
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
      setAmountError(null);
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

          <div className="flex w-[65%] flex-row justify-between">
            <div className="flex flex-row gap-5">
              <RadioButton
                id="expense"
                name="category"
                value="-"
                labelValue="Expense"
                onChange={() => handleRadioChange(true)}
                isChecked={isExpense}
              />
              <RadioButton
                id="income"
                name="category"
                value="+"
                labelValue="Income"
                onChange={() => handleRadioChange(false)}
                isChecked={!isExpense}
              />
            </div>

            <div className="mr-5">
              <CheckBox
                id="dataCheckBox"
                name="dataCheckBox"
                labelValue="Choose date"
                onChange={handleCheckBoxChange}
                isChecked={isDateVisible}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex w-[100%] flex-row">
              <div className="flex w-[50%] flex-row items-center gap-5">
                <select
                  id="select-category"
                  className="block w-[50%] rounded-lg border bg-gray-50 px-2.5 py-1.5 text-gray-900"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Other" selected>
                    Other
                  </option>

                  {optionsToShow.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label htmlFor="select-category">Category</label>
              </div>

              <div>
                {isDateVisible && (
                  <input
                    type="date"
                    className="black-calendar block w-full rounded-xl border bg-gray-50 px-2.5 py-1.5 text-sm text-black"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Send button */}
            <button
              disabled={disableSend}
              className={`box-border p-2 pl-5 pr-5 text-sm ${disableSend ? "cursor-not-allowed text-gray-700" : ""}`}
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
  recordToEdit: transactionShape,
};

export default AddRecordForm;
