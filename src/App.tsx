import React from "react";
import axios from "axios";
export default function App() {
  const [search, setSearch] = React.useState("");
  const [transactions, setTransactions] = React.useState(null);
  const getAssociations = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carVin/" + search)
      .then((response) => {
        setTransactions(response.data);
      });
  };

  return (
    <div className="p-4">
      <h1>Search car by Vin</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={getAssociations}>Search</button>
      {!transactions ? (
        <p>No results</p>
      ) : (
        <div>
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
