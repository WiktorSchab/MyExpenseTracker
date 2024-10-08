const sortingUtils = {
  /**
   * Sorts an array of transactions by date.
   *
   * @param {array} obj - The array of transactions to be sorted.
   * @param {boolean} con - Determines the sorting order.
   *   - If `true`, sorts in descending order (latest dates first).
   *   - If `false`, sorts in ascending order (earliest dates first).
   * @returns {Array} - The sorted array (obj) of transactions.
   */
  sortByDate: (obj, con) => {
    if (con) {
      obj.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      obj.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return obj;
  },

  /**
   * Sorts an array of transactions by value, taking into account if the value is negative (valueType).
   *
   * @param {Array} obj - The array of transactions to be sorted.
   * @param {boolean} con - Determines the sorting order.
   *   - If `true`, sorts in ascending order (smallest values first).
   *   - If `false`, sorts in descending order (largest values first).
   * @returns {Array} - The sorted array (obj) of transactions.
   */
  sortByValue: (obj, con) => {
    obj.sort((a, b) => {
      const aValue = a.valueType === "-" ? -a.value : a.value;
      const bValue = b.valueType === "-" ? -b.value : b.value;

      return con ? bValue - aValue : aValue - bValue;
    });
    return obj;
  },

  /**
   * Filters an array of transactions based on the valueType.
   *
   * @param {Array} obj - The array of transactions to be filtered.
   * @param {string} con - The type of transactions to filter.
   *   - If "expenses", returns only transactions with a valueType of "-".
   *   - else, returns only transactions with a valueType of "+".
   * @returns {Array} - The filtered new array of transactions.
   */
  filterByType: (obj, filterType) => {
    if (filterType === "expenses") {
      return obj.filter((transaction) => transaction.valueType === "-");
    } else {
      return obj.filter((transaction) => transaction.valueType === "+");
    }
  },

  /**
   * Filters an array of transactions based on the value range (minValue and maxValue).
   *
   * @param {Array} obj - The array of transactions to be filtered.
   * @param {number} minValue - The minimum value to filter by (inclusive).
   * @param {number} maxValue - The maximum value to filter by (inclusive).
   * @returns {Array} - The filtered new array of transactions.
   */

  filterByMaxMinValue: (obj, minValue, maxValue) => {
    return obj.filter((transaction) => {
      const value =
        transaction.valueType === "-" ? -transaction.value : transaction.value;

      if (minValue && maxValue) {
        return value >= minValue && value <= maxValue;
      }
      if (minValue) {
        return value >= minValue;
      }
      if (maxValue) {
        return value <= maxValue;
      }
    });
  },
};

export default sortingUtils;
