import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export class ResultCard extends React.Component<any, any> {
  render() {
    return (
      <div className="px-2">
        <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-md ">
          <h1>
            {this.props.loading ? (
              <Skeleton />
            ) : (
              "Action: " + this.props.transaction.action
            )}
          </h1>
          <h2>
            {this.props.loading ? (
              <Skeleton />
            ) : (
              "Action Value: " + this.props.transaction.actionValue
            )}
          </h2>
          <a
            target="_blank"
            href={`https://devnet-explorer.elrond.com/transactions/${
              this.props.loading ? " " : this.props.transaction.txHash
            }`}
            className="block truncate"
          >
            {this.props.loading ? <Skeleton /> : "Action TxHash:"}
            <span className="pl-2 text-blue-500 hover:opacity-75">
              {this.props.loading ? (
                <Skeleton />
              ) : (
                this.props.transaction.txHash
              )}
            </span>
          </a>
          <p>
            {this.props.loading ? (
              <Skeleton />
            ) : (
              "Date: " + this.props.transaction.timestamp
            )}
          </p>
        </div>
      </div>
    );
  }
}
