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
        <div className="p-8 my-4 text-xl bg-white border border-gray-200 rounded-lg shadow-md ">
          <p className="text-center">
            {loading ? <Skeleton /> : "VehickDetails"}
          </p>
          <h1>
            <b>VIN: </b>
            {loading ? (
              <Skeleton />
            ) : (
              resultList[resultList.length - 1]?.actionValue
            )}
          </h1>
          <h2>
            <b>Address: </b>
            {loading ? <Skeleton /> : resultList[0]?.carAddress}
          </h2>
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
