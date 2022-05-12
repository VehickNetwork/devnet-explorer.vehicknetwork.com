import React, { useRef, useSyncExternalStore } from "react";
import axios from "axios";
import ResultList from "./components/ResultList";
import { ResultCard } from "./components/ResultCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [search, setSearch] = React.useState("");
  const [transactions, setTransactions] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [transactionLength, setTransactionLength] = React.useState(null);
  const [vehickInformation,setVehickInformation]= React.useState(undefined);
 
  React.useEffect(() => {
    if(transactions){
    const interval = setInterval(() => {
      if (search.length == 62 && search.includes("erd")) {
        getTransactionsByAddress();
      } else {
        getTransactionsByVin();
      }
    }, 7500);
    return () => clearInterval(interval);
    }
  }, [transactions]);




  const getTransactionsByVin = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carVin/" + search)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
        if (
          transactionLength != response.data.length &&
          transactionLength != null
        ) {
          toast.success("New information received", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setTransactionLength(response.data.length);
      }).then(()=>{
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${transactions[transactions?.length -1]?.actionValue}?format=json`).then((response)=>{
    setVehickInformation(response?.data?.Results[0]);
    console.log(response.data.Results[0]);
      });
  });
}
  const getTransactionsByAddress = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carAddress/" + search)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
        if (
          transactionLength != response.data.length &&
          transactionLength != null
        ) {
          toast.success("New information received", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setTransactionLength(response.data.length);
      }).then(()=>{
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${transactions[transactions?.length -1].actionValue}?format=json`).then((response)=>{
    setVehickInformation(response.data);
    console.log(response.data);
  });
      });
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (search.length == 62 && search.includes("erd")) {
        getTransactionsByAddress();
        setTransactionLength(null);
        setLoading(true);
      } else {
        getTransactionsByVin();
        setTransactionLength(null);
        setLoading(true);
      }
      
    }
  };
  const handleClick = () => {
    if (search.length == 62 && search.includes("erd")) {
      getTransactionsByAddress();
      
    } else {
      getTransactionsByVin();
     
    }
    setLoading(true);
    setTransactionLength(null);
  };
  return (
    <div className="block p-2">
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
          className="inline-block px-4 py-2 ml-2 font-bold text-white align-middle bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
      {loading ? (
        <>
          <ResultCard loading={loading} />
          <ResultCard loading={loading} />
          <ResultCard loading={loading} />
          <ResultCard loading={loading} />
        </>
      ) : (
        <ResultList loading={loading} transactions={transactions} />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
