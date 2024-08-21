import { Children, useState } from "react";
import PropTypes from "prop-types";

// Component to generate list of option buttons in settings
const GenerateButtonList = ({ children }) => {
  const listItems = Children.map(children, (child, index) => (
    <li key={index}>{child}</li>
  ));

  return <ul className="w-[45%]">{listItems}</ul>;
};

const deleteTransaction = () => {
  localStorage.setItem("transactions", null);
  window.location.reload();
};

GenerateButtonList.propTypes = {
  children: PropTypes.node.isRequired,
};

function Settings() {
  const [downloadDataError, setDownloadDataError] = useState(null);
  const [uploadDataError, setUploadDataError] = useState(null);

  const downloadTransaction = () => {
    const transactions = localStorage.getItem("transactions");

    if (!transactions) {
      setDownloadDataError("No transactions found in localStorage.");
      return;
    } else {
      setDownloadDataError();
    }

    const blob = new Blob([transactions], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json") {
      setUploadDataError("Please upload a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const json = JSON.parse(content);
        localStorage.setItem("transactions", JSON.stringify(json));
        window.location.reload();
      } catch (error) {
        setUploadDataError("Error reading or parsing the JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <h5 className="mb-5">Settings</h5>
      <div className="flex w-[100%] justify-between px-5">
        <GenerateButtonList>
          <div>
            <button className="mb-2 w-full" onClick={deleteTransaction}>
              Delete transactions data
            </button>
          </div>
          <div>
            {downloadDataError && (
              <span className="block text-center font-bold text-red-400">
                {downloadDataError}
              </span>
            )}
            <button className="mb-2 w-full" onClick={downloadTransaction}>
              Download transactions data
            </button>
          </div>
          <div>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="block text-center font-bold text-red-400">
                {uploadDataError}
              </span>
              <button
                className="mb-2 w-full"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Upload transactions data
              </button>
            </div>
          </div>
        </GenerateButtonList>
        <GenerateButtonList>
          <p>(not available yet)</p>
          <button className="w-full" disabled>
            Night mode ON/Day mode ON
          </button>
        </GenerateButtonList>
      </div>
    </>
  );
}

export default Settings;
