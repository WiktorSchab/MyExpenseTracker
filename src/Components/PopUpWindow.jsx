import PropTypes from "prop-types";
import { useEffect } from "react";

function PopUpWindow({ children, closePopUp }) {
  // Functions that calls `closePopUp` on `Escape` button
  const escapeToClose = (e) => {
    if (e.key === "Escape") {
      closePopUp();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escapeToClose);

    return () => document.removeEventListener("keydown", escapeToClose);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 h-full w-full bg-black/40 backdrop-blur">
      <div className="relative flex h-full w-full items-center justify-center">
        <button
          onClick={closePopUp}
          className="small-round-button text-xxl absolute right-0 top-0 m-5 bg-white text-black"
        >
          ✕
        </button>

        <div className="mb-[50px] flex min-h-[300px] w-[700px] rounded border-2 border-white p-2">
          <div className="h-full min-h-[300px] w-full rounded bg-blue-400 p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

PopUpWindow.propTypes = {
  children: PropTypes.element.isRequired,
  closePopUp: PropTypes.func.isRequired,
};

export default PopUpWindow;
