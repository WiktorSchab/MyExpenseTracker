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
   * Sorts an array of transactions by value.
   *
   * @param {Array} obj - The array of transactions to be sorted.
   * @param {boolean} con - Determines the sorting order.
   *   - If `true`, sorts in ascending order (lowest values first).
   *   - If `false`, sorts in descending order (highest values first).
   * @returns {Array} - The sorted array of transactions.
   */
  sortByValue: (obj, con) => {
    if (con) {
      obj.sort((a, b) => a.value - b.value);
    } else {
      obj.sort((a, b) => b.value - a.value);
    }

    return obj;
  },
};

export default sortingUtils;
