import { Children } from "react";
import PropTypes from "prop-types";

// Component to generate list of option buttons in settings
const GenerateButtonList = ({ children }) => {
  const listItems = Children.map(children, (child, index) => (
    <li key={index}>{child}</li>
  ));

  return <ul className="w-[45%]">{listItems}</ul>;
};
GenerateButtonList.propTypes = {
  children: PropTypes.node.isRequired,
};

function Settings() {
  return (
    <>
      <h5 className="mb-5">Settings</h5>
      <div className="flex w-[100%] justify-between px-5">
        <GenerateButtonList>
          <button className="mb-2 w-full">Delete transactions data</button>
          <button className="mb-2 w-full">Download transactions data</button>
          <button className="mb-2 w-full">Upload transactions data</button>
        </GenerateButtonList>
        <GenerateButtonList>
          <button className="w-full">Night mode ON/Day mode ON</button>
        </GenerateButtonList>
      </div>
    </>
  );
}

export default Settings;
