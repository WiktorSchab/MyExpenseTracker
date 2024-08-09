const sortingUtils = {
  /**
   * Sorts an array of transactions by date.
   *
   * @param {array} obj - The array of transactions to be sorted.
   * @param {boolean} con - Determines the sorting order.
   *   - If `true`, sorts in descending order (latest dates first).
   *   - If `false`, sorts in ascending order (earliest dates first).
   * @returns {Array} - The sorted array of transactions.
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
   * @returns {Array} - The sorted array of transactions.
   */
  sortByValue: (obj, con) => {
    obj.sort((a, b) => {
      const aValue = a.valueType === "-" ? -a.value : a.value;
      const bValue = b.valueType === "-" ? -b.value : b.value;

      return con ? aValue - bValue : bValue - aValue;
    });
    return obj;
  },
};

export default sortingUtils;
