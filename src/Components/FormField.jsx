import PropTypes from "prop-types";

function FormField({
  id,
  label,
  placeholder,
  maxLength = 64,
  onChange,
  value,
  validationError,
}) {
  return (
    <div className="row col justify-start">
      <label
        htmlFor={id}
        className="mb-2 ml-1 mt-2 block text-left text-sm font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="block w-full rounded-xl border bg-gray-50 p-2.5 text-sm text-black"
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        required
      />
      {validationError && (
        <span className="block text-left font-bold text-red-400">
          {validationError}
        </span>
      )}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
  validationError: PropTypes.string,
};

export default FormField;
