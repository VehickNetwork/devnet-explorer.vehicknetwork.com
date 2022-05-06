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

  return (
    <div className="p-4">
      <h1>Search car by Vin</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button
        onClick={
          search.length == 62 && search.includes("erd")
            ? getTransactionsByAddress
            : getTransactionsByVin
        }
      >
        Search
      </button>
      {!transactions ? (
        <p>No results</p>
      ) : (
        <div>
          <h1>Car VIN: {transactions[transactions.length - 1].actionValue}</h1>
          <div className="flex p-4">
            <h1 className="pr-2">Current mileage:</h1>
            <h1 className="pr-2">{transactions[0].actionValue}</h1>
            <h1 className="pr-2">
              {transactions[transactions.length - 2].actionValue}
            </h1>
          </div>
          <h1 className="font-bold">History:</h1>
          {transactions.map((tx: any, i: number) => (
            <div className="p-5">
              <h1>Action: {tx.action}</h1>
              <h2>Action Value: {tx.actionValue}</h2>
              <p id={i.toString()}>Tx Hash: {tx.txHash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
