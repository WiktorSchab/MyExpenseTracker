import PropTypes from "prop-types";

function CheckBox({ id, name, value, onChange, isChecked, labelValue }) {
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="peer hidden"
        onChange={onChange}
        checked={isChecked}
      />
      <span className="mr-2 inline-block h-4 w-4 rounded border border-blue-500 peer-checked:border-transparent peer-checked:bg-blue-500"></span>
      {labelValue}
    </label>
  );
}

export default CheckBox;

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  labelValue: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
  isChecked: false,
};
