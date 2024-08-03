import PropTypes from "prop-types";

function AddRecordForm({ onClose }) {
  return (
    <div className="slide-in absolute bottom-0 left-0 h-[40%] w-[100%] bg-cyan-50">
      <div className="w-[100%]bg-blue-500 relative h-[100%]">
        <button
          onClick={onClose}
          className="small-round-button absolute right-0 top-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

AddRecordForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddRecordForm;
