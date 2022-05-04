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
    <div className="app">
      <h1>Search car by Vin</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={getAssociations}>Search</button>
      {!transactions ? (
        <p>No results</p>
      ) : (
        <div>
          {transactions.map((tx: any, i: number) => (
            <p key={i}>{tx.txHash}</p>
          ))}
        </div>
      )}
    </div>
  );
}
