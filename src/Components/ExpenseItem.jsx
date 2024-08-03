import PropTypes from "prop-types";

function ExpenseItem({ valueType, value, description, type, category }) {
  return (
    <li className="flex flex-row bg-blue-600 p-2 text-left">
      <div className="flex w-[500px] flex-row items-center">
        <p className="w-[150px]">
          {valueType}
          {value}$ {description}
        </p>
        <div className="ml-5">
          <p>Type: {type}</p>
          <p>Category: {category}</p>
        </div>
      </div>
      <div className="ml-auto">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
}

ExpenseItem.propTypes = {
  valueType: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  category: PropTypes.string,
};

ExpenseItem.defaultProps = {
  description: "No description provided",
  category: "Uncategorized",
};

export default ExpenseItem;
