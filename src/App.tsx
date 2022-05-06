import React from "react";
import axios from "axios";
export default function App() {
  const [search, setSearch] = React.useState("");
  const [transactions, setTransactions] = React.useState(null);
  const [measureUnit, setMeasureUnit] = React.useState("");
  const getTransactionsByVin = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carVin/" + search)
      .then((response) => {
        setTransactions(response.data);
      });
  };
  const getTransactionsByAddress = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carAddress/" + search)
      .then((response) => {
        setTransactions(response.data);
      });
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (search.length == 62 && search.includes("erd")) {
        getTransactionsByAddress();
      } else {
        getTransactionsByVin();
      }
    }
  };
  return (
    <div className="p-4">
      <h1>Search</h1>
      <div className="flex items-center justify-center">
        <input
          className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={search}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="inline-block px-4 py-2 font-bold text-white align-middle bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={
            search.length == 62 && search.includes("erd")
              ? getTransactionsByAddress
              : getTransactionsByVin
          }
        >
          Search
        </button>
      </div>
      {!transactions ? (
        <p>No results</p>
      ) : (
        <div className="px-2 py-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h1>VIN: {transactions[transactions.length - 1].actionValue}</h1>
            <div className="flex pt-4">
              <h1 className="pr-2">Current mileage:</h1>
              <h1 className="pr-2">{transactions[0].actionValue}</h1>
              <h1 className="pr-2">
                {transactions[transactions.length - 2].actionValue}
              </h1>
            </div>
          </div>
          <h1 className="py-4 font-bold">History:</h1>
          {transactions.map((tx: any, i: number) => (
            <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <h1>Action: {tx.action}</h1>
              <h2>Action Value: {tx.actionValue}</h2>
              <p id={i.toString()}>Tx Hash: {tx.txHash}</p>
              <p>Date: {tx.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
