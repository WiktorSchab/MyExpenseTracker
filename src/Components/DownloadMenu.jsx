function DownloadMenu() {
  return (
    <>
      <h5 className="text-lg">Download Expense Report</h5>
      <div className="mt-3 flex items-center justify-center px-5">
        <div className="flex w-full max-w-md flex-col gap-4">
          <div className="flex justify-between gap-4">
            <div className="flex w-[45%] flex-col">
              <label className="mb-1 text-sm">Start Date</label>
              <input
                type="date"
                className="black-calendar block w-full rounded-xl border bg-gray-50 px-2.5 py-1.5 text-sm text-black"
              />
            </div>
            <div className="flex w-[45%] flex-col">
              <label className="mb-1 text-sm">End Date</label>
              <input
                type="date"
                className="black-calendar block w-full rounded-xl border bg-gray-50 px-2.5 py-1.5 text-sm text-black"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Include</label>
            <select className="block w-[100%] rounded-lg border bg-gray-50 px-2.5 py-1.5 text-gray-900">
              <option>All</option>
              <option>Expenses only</option>
              <option>Income only</option>
            </select>
          </div>
          <button className={`box-border p-2 pl-5 pr-5 text-sm`}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default DownloadMenu;
