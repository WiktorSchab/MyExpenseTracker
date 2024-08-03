import PropTypes from "prop-types";

function FormField({ id, label, placeholder, maxLength }) {
  return (
    <div className="row col w-[80%] justify-start">
      <label
        htmlFor={id}
        className="mb-2 ml-1 mt-2 block text-left text-sm font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="block w-full rounded-xl border bg-gray-50 p-2.5 text-sm"
        placeholder={placeholder}
        maxLength={maxLength}
        required
      />
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

FormField.defaultProps = {
  maxLength: 64,
};

export default FormField;
