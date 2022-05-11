import React, { useRef } from "react";
import axios from "axios";
import ResultList from "./components/ResultList";
import { ResultCard } from "./components/ResultCard";
import Skeleton from "react-loading-skeleton";
import VehickDetails from "./components/ResultList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [search, setSearch] = React.useState("");
  const [transactions, setTransactions] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [transactionLength, setTransactionLength] = React.useState(null);
  const prevTransactionLength = usePrevious(transactionLength);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (search.length == 62 && search.includes("erd")) {
        getTransactionsByAddress();
        if (
          prevTransactionLength != transactionLength &&
          prevTransactionLength != null
        ) {
          toast.success("New information", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.log("new:", transactionLength, "old: ", prevTransactionLength);
        getTransactionsByVin();
        if (
          prevTransactionLength != transactionLength &&
          prevTransactionLength != null
        ) {
          toast.success("New information", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }, 7500);
    return () => clearInterval(interval);
  }, [transactionLength]);

  const getTransactionsByVin = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carVin/" + search)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
        setTransactionLength(response.data.length);
      });
  };
  const getTransactionsByAddress = () => {
    axios
      .get("https://devnet-gateway.vehicknetwork.com/api/carAddress/" + search)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
        setTransactionLength(response.data.length);
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
function usePrevious(value: any) {
  const ref = useRef();
  React.useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}
