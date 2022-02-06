import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export const Loading = () => {
  return (
    <div>
      <div className="loading__container">
        <div
          className="loading__container__box"
          style={{ display: "flex", alignItems: "center", margin: "10px" }}
        >
          <div className="loading__container__box__circle">
            <Skeleton
              variant="circle"
              width={60}
              height={60}
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div
            className="loading__container__box__box"
            style={{ marginLeft: "40px" }}
          >
            <Skeleton
              variant="rect"
              width={600}
              height={170}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
        <div
          className="loading__container__box"
          style={{ display: "flex", alignItems: "center", margin: "10px" }}
        >
          <div className="loading__container__box__circle">
            <Skeleton
              variant="circle"
              width={60}
              height={60}
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div
            className="loading__container__box__box"
            style={{ marginLeft: "40px" }}
          >
            <Skeleton
              variant="rect"
              width={600}
              height={170}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
        <div
          className="loading__container__box"
          style={{ display: "flex", alignItems: "center", margin: "10px" }}
        >
          <div className="loading__container__box__circle">
            <Skeleton
              variant="circle"
              width={60}
              height={60}
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div
            className="loading__container__box__box"
            style={{ marginLeft: "40px" }}
          >
            <Skeleton
              variant="rect"
              width={600}
              height={170}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
