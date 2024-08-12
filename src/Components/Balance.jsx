import PropTypes from "prop-types";
import { transactionShape } from "../Lib/types";

function Balance({ transactions }) {
  let sumOfIncome = 0;
  let sumOfExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.valueType === "-") {
      sumOfExpense += transaction.value;
    } else {
      sumOfIncome += transaction.value;
    }
  });

  const balance = sumOfIncome - sumOfExpense;

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-2 mt-2">Balance: {balance}$</h3>
      <div className="h-[300px] w-[300px] bg-blue-200"></div>
    </div>
  );
}

Balance.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape),
};

export default Balance;
