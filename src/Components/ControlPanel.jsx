import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import sortingUtils from "../Lib/sortingFunctions";
import { transactionShape } from "../Lib/types";

function ControlPanel({ transactions, setFilteredTransactions }) {
  // for sorting, filtering etc
  const [amountSorting, setAmountSorting] = useState("");
  const [isDateSortDesc, setIsDateSortDesc] = useState(true);
  const [typeRecordFilter, setTypeRecordFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
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
  );
}

ControlPanel.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape),
  setFilteredTransactions: PropTypes.func,
};

export default ControlPanel;
