import PropTypes from "prop-types";

function Header({ date, setDate }) {
  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const prevNextButton = (icon, onClick) => {
    return (
      <button onClick={onClick} className="small-round-button bg-blue-400">
        {icon}
      </button>
    );
  };

  return (
    <>
      <header className="flex justify-between">
        {prevNextButton("←", handlePrevMonth)}
        <h1 className="mb-2 mt-5">
          {date.toLocaleString("en-US", { month: "long" })} expenses
        </h1>
        {prevNextButton("→", handleNextMonth)}
      </header>
      <hr />
    </>
  );
}

Header.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default Header;
