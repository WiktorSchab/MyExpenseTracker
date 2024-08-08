import PropTypes from "prop-types";

function RadioButton({ id, name, value, labelValue, onClick, isChecked }) {
  return (
    <>
      <label className="flex cursor-pointer items-center">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          className="peer hidden"
          onClick={onClick}
          checked={isChecked}
        />
        <span className="mr-2 inline-block h-4 w-4 rounded-full border border-blue-500 peer-checked:border-transparent peer-checked:bg-blue-500"></span>
        {labelValue}
      </label>
    </>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelValue: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

RadioButton.defaultProps = {
  isChecked: false,
};

export default RadioButton;
