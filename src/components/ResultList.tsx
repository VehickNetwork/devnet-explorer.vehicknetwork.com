import React from "react";
import { ResultCard } from "./ResultCard";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
export default function ResultList(props: any) {
  const resultList = props.transactions;
  const loading = props.loading;
  const listItems = resultList?.map((transaction: any, i: number) => (
    <ResultCard
      key={i.toString()}
      transaction={transaction}
      loading={loading}
    />
  ));
  return (
    <>
      <VehickDetails loading={loading} resultList={resultList} />
      <ul>{listItems}</ul>
    </>
  );
}
export function VehickDetails(props: any) {
  const loading = props.loading;
  const resultList = props.resultList;
  if (resultList != undefined) {
    return (
      <>
        <div className="p-2 my-4 bg-white border border-gray-200 rounded-lg shadow-md text-small ">
          <p className="text-center">
            {loading ? <Skeleton /> : "Vehick Details"}
          </p>
          <h1>
            <b>VIN: </b>
            {loading ? (
              <Skeleton />
            ) : (
              resultList[resultList.length - 1]?.actionValue
            )}
          </h1>
          <b>Address: </b>
          <a
            target="_blank"
            href={`https://devnet-explorer.elrond.com/address/${
              loading ? " " : resultList[0].carAddress
            }`}
            className="block truncate"
          >
            <span className="text-blue-500 hover:opacity-75">
              {loading ? <Skeleton /> : resultList[0].carAddress}
            </span>
          </a>
          <h2>
            <b>{`Current milleage: `}</b>
            {loading ? (
              <Skeleton />
            ) : (
              <NumberFormat
                thousandSeparator={true}
                value={resultList[0]?.actionValue}
                displayType={"text"}
              />
            )}
            {loading ? (
              <Skeleton />
            ) : (
              ` ${resultList[resultList.length - 2]?.actionValue}`
            )}
          </h2>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
