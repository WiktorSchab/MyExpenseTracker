function Balance() {
  return (
    <>
      <h1 className="mb-2 mt-5">Monthly expenses</h1>
      <hr />
      {/* Sum of montly expenses and chart */}
      <div className="flex flex-col items-center">
        <h3 className="mb-2 mt-2">Balance: 3000$</h3>
        <div className="h-[300px] w-[300px] bg-blue-200"></div>
      </div>
    </>
  );
}

export default Balance;
