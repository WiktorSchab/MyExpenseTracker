import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { transactionShape } from "../Lib/types";
import ChartComponent from "./ChartComponent"; // Import the Chart component

function Balance({ transactions, dateOfData }) {
  const [labels, setLabels] = useState([]);
  const [balances, setBalances] = useState([]);
  const [lastDayBalance, setLastDayBalance] = useState(0);

  // Displaying information on data points in chart
  const callbackLabelFun = (context) => {
    const day = context.label;
    const balance = context.raw;
    return `Day: ${day}, Balance: ${balance.toFixed(2)}`;
  };

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    const monthOfData = dateOfData.getMonth() + 1;
    const yearOfData = dateOfData.getFullYear();

    const today = new Date();
    const dayToday = today.getDate();
    const monthToday = today.getMonth() + 1;
    const yearToday = today.getFullYear();

    // Added first day of month as default value
    const dailyBalances = { "01": 0 };

    // Getting balance of each day
    transactions.forEach(({ date, value, valueType }) => {
      const day = date.slice(8, 10);
      const adjustedValue = valueType === "-" ? -value : value;

      if (!dailyBalances[day]) {
        dailyBalances[day] = 0;
      }

      dailyBalances[day] += adjustedValue;
    });

    // Sorting days
    const sortedDays = Object.keys(dailyBalances).sort((a, b) => a - b);
    const lastDay = sortedDays[sortedDays.length - 1];

    // Adding bilance of today/last day month if there is not any. That is made for visual aspect of chart
    if (yearToday > yearOfData || monthToday > monthOfData) {
      const lastDayOfMonth = getLastDayOfMonth(yearOfData, monthOfData);
      const lastDayString = lastDayOfMonth.toString();
      sortedDays.push(lastDayString);
      dailyBalances[lastDayString] = 0;
    } else if (dayToday > lastDay) {
      sortedDays.push(dayToday);
      dailyBalances[dayToday] = 0;
    }

    // Getting cumulative balance of each day
    const cumulativeBalances = {};
    let cumulativeBalance = 0;
    sortedDays.forEach((day) => {
      cumulativeBalance += dailyBalances[day];
      cumulativeBalances[day] = cumulativeBalance;
    });

    // Getting monthly balance
    setLastDayBalance(cumulativeBalances[lastDay] || 0);

    // Convert cumulativeBalances to arrays for charting
    setLabels(sortedDays);
    setBalances(sortedDays.map((day) => cumulativeBalances[day]));
  }, [transactions, dateOfData]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-2 mt-2">
        Balance of the month: {lastDayBalance.toFixed(2)}$
      </h3>
      <div className="border-2 border-slate-50">
        <ChartComponent
          chartType="line"
          labels={labels}
          data={balances}
          informations={{
            xLabel: "Day of the Month",
            yLabel: "Balance",
            callbackLabelFun: callbackLabelFun,
          }}
        />
      </div>
    </div>
  );
}

Balance.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
  dateOfData: PropTypes.instanceOf(Date).isRequired,
};

export default Balance;
