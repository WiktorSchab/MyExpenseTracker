import PropTypes from "prop-types";

export const transactionShape = PropTypes.shape({
  id: PropTypes.number,
  valueType: PropTypes.string,
  value: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.string,
});
