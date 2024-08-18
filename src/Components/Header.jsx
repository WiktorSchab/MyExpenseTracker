import PropTypes from "prop-types";
import { Cog6ToothIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import PopUpWindow from "./PopUpWindow";
import Settings from "./Settings";
import DownloadMenu from "./DownloadMenu";
import { useState } from "react";

function Header({ date, setDate }) {
  const [isPopUpDisplayed, setIsPopUpDisplayed] = useState(false);
  const [popUpComp, setPopUpComp] = useState(null);

  const generatePopUp = (popUpComp) => {
    return <PopUpWindow closePopUp={closePopUp}>{popUpComp}</PopUpWindow>;
  };

  const closePopUp = () => setIsPopUpDisplayed(false);

  const handleSettingsOpen = () => {
    setPopUpComp(<Settings />);
    setIsPopUpDisplayed(true);
  };
  const handleDownloadMenuOpen = () => {
    setPopUpComp(<DownloadMenu />);
    setIsPopUpDisplayed(true);
  };

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
      <header className="relative flex justify-center">
        {isPopUpDisplayed && generatePopUp(popUpComp)}
        {/* Settings and download buttons / functionality will be implemented in future */}
        <div className="absolute left-0 mt-2 flex gap-2">
          <Cog6ToothIcon
            className="mr-2 h-6 w-6 cursor-pointer"
            onClick={handleSettingsOpen}
          />
          <ArrowDownTrayIcon
            className="mr-2 h-6 w-6 cursor-pointer"
            onClick={handleDownloadMenuOpen}
          />
        </div>
        <div className="mt-5 flex w-[85%] justify-between">
          {prevNextButton("←", handlePrevMonth)}
          <h1 className="mb-2">
            {date.toLocaleString("en-US", { month: "long" })} expenses
          </h1>
          {prevNextButton("→", handleNextMonth)}
        </div>
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
