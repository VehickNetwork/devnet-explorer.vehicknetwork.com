import React from "react";
import { ResultCard } from "./ResultCard";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import NumberFormat from "react-number-format";
export default function ResultList(props: any) {
  const resultList = props.transactions;
  const loading = props.loading;
  const vehickInformation = props.vehickInformation;

  const listItems = resultList?.map((transaction: any, i: number) => (
    <ResultCard
      key={i.toString()}
      transaction={transaction}
      loading={loading}
    />
  ));
  if (resultList && vehickInformation) {
    return (
      <>
        <VehickDetails
          loading={loading}
          resultList={resultList}
          vehickInformation={vehickInformation}
        />
        <ul>{listItems}</ul>
      </>
    );
  }
}
export function VehickDetails(props: any) {
  const loading = props.loading;
  const resultList = props.resultList;
  const vehickInformation = props.vehickInformation;
  console.log(vehickInformation);
  if (resultList) {
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
              resultList.map(element => {
                console.log(element.action)
                if(element.action=="addVIN"){
                 return (resultList[resultList.indexOf(element)].actionValue)
                }
              })
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
             (/[0-9]/.test(resultList[0]?.actionValue) ? `${resultList[0]?.actionValue} ` : "0 ")
            )}
            {loading ? (
              <Skeleton />
            ) : (
              resultList.map(element => {
                console.log(element.action)
                if(element.action=="addMeasureUnit"){
                 return (resultList[resultList.indexOf(element)].actionValue)
                }
              })
            )}
          </h2>
          <h3>
            <b>Manufacturer: </b>
            {loading ? <Skeleton /> : vehickInformation.Manufacturer}
          </h3>
          <h3>
            <b>Make: </b>
            {loading ? <Skeleton /> : vehickInformation.Make}
          </h3>
          <h3>
            <b>Model: </b>
            {loading ? <Skeleton /> : vehickInformation.Model}
          </h3>
          <h3>
            <b>Year: </b>
            {loading ? <Skeleton /> : vehickInformation.ModelYear}
          </h3>
          <h3>
            <b>Country: </b>
            {loading ? <Skeleton /> : vehickInformation.PlantCountry}
          </h3>
          <h3>
            <b>Type: </b>
            {loading ? <Skeleton /> : vehickInformation.VehicleType}
          </h3>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

