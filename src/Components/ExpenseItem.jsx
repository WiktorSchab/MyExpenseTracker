import PropTypes from "prop-types";

function ExpenseItem({
  id,
  valueType,
  value,
  description,
  type,
  category = "Uncategorized",
  date,
  onEditFunc,
  onDelFunc,
}) {
  return (
    <li className="flex flex-row bg-blue-600 p-2 text-left">
      <div className="flex w-[700px] justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[250px]">
            {valueType}
            {value.toFixed(2)}$ {description}
          </p>
          <div className="ml-5">
            <p>Type: {type}</p>
            <p>Category: {category}</p>
          </div>
        </div>

        <div className="mr-5 flex flex-col items-center">
          <p>Date:</p>
          <p>{date}</p>
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        <button onClick={() => onEditFunc(id)}>Edit</button>
        <button onClick={() => onDelFunc(id)}>Delete</button>
      </div>
    </li>
  );
}

ExpenseItem.propTypes = {
  id: PropTypes.number.isRequired,
  valueType: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  category: PropTypes.string,
  date: PropTypes.string,
  onEditFunc: PropTypes.func,
  onDelFunc: PropTypes.func,
};

export default ExpenseItem;
