import { getDatabase, onValue, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { auth, database } from "../../../firebase";

var orderRequestsDataArray = [];

var orderRequestsDataArrayModal = [];

var global__table__number = 1;

function OrderRequests() {
  const [orderRequestsDataArrayState, setOrderRequestsDataArrayState] =
    useState([]);

  const [indexOfClickedRow, setIndexOfClickedRow] = useState(null);

  useEffect(() => {
    orderRequestsDataArray.length = 0;
    const db = getDatabase();
    const dbRef = ref(db, `active__orders/${auth.currentUser.uid}`);
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.child("order__status").val() === " ") {
          orderRequestsDataArray.push(childSnapshot.val());
        }
        global__table__number = childSnapshot.child("table__number").val();
      });
      setOrderRequestsDataArrayState(orderRequestsDataArray);
    });
  }, []);

  const renderOrderRequestTable = () => {
    return orderRequestsDataArrayState.map((results, index) => {
      const { table__number, table__id, total__diners, total__bill } = results; //destructuring

      return (
        <tr
          className="table-info"
          data-bs-toggle="modal"
          data-bs-target="#modalForOrderRequests"
          key={index}
          onClick={() => {
            setIndexOfClickedRow(index + 1);
          }}
        >
          <th scope="row">{index + 1}</th>
          <td id={`table_number__${index + 1}`}>{table__number}</td>
          <td id={`table_id__${index + 1}`}>{table__id}</td>
          <td id={`table_total__diners__${index + 1}`}>{total__diners}</td>
          <td id={`table_bill__${index + 1}`}>₹{total__bill}</td>
        </tr>
      );
    });
  };

  const renderSingleTable = () => {
    // eslint-disable-next-line
    return orderRequestsDataArrayModal.map((results, index) => {
      const { items } = results;
      console.log(items);
      var myTable = "<tbody>";
      if (items !== undefined) {
        for (let i = 0; i < Object.keys(items).length; i++) {
          const val = items[Object.keys(items)[i]];
          myTable += `<tr key=${i} style="border-bottom: 2px solid #dc3546">`;
          myTable += `<td>${Object.keys(items)[i]}</td>`;
          myTable += `<td>${val.half__plate}</td>`;
          myTable += `<td>${val.full__plate}</td></tr>`;
        }
      }
      myTable += `</tbody>`;
      setTimeout(() => {
        // remove this return if this code doesn't work
        return (document.getElementById("printTableForMenu").innerHTML =
          myTable);
      }, 1000);
    });
  };

  const renderModalData = () => {
    var tableNumber =
      document.getElementById(`table_number__${indexOfClickedRow}`) === null
        ? global__table__number
        : document.getElementById(`table_number__${indexOfClickedRow}`)
            .innerText;
    orderRequestsDataArrayModal = orderRequestsDataArrayState.filter(
      (result) => String(result.table__number) === String(tableNumber)
    );
    console.log(orderRequestsDataArrayModal);
    return orderRequestsDataArrayModal.map((results, index) => {
      return (
        <div className="modal-content" key={index}>
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Order Request Details For Table Number {results.table__number}.
            </h5>
          </div>
          <div className="modal-body">
            <div
              className="modal__content__container1"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div className="modal__content__container1__table__number">
                Table Number:- {results.table__number}
              </div>
              <div className="modal__content__container1__table__id">
                Table Id:- {results.table__id}
              </div>
              <div className="modal__content__container1__table__total__diners">
                Total Diners:- {results.total__diners}
              </div>
            </div>
            <div
              className="modal__content__container2"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="modal__content__container2__menu"
                style={{
                  margin: "3vh auto",
                  width: "30vw",
                }}
              >
                <table
                  className="table"
                  style={{
                    color: "white",
                  }}
                >
                  <thead style={{ borderBottom: "2px solid #dc3546" }}>
                    <tr>
                      <th>Menu Item</th>
                      <th>Half Plate</th>
                      <th>Full Plate</th>
                    </tr>
                  </thead>
                  <tbody id="printTableForMenu"></tbody>
                  {renderSingleTable()}
                </table>
              </div>
            </div>
            <div
              className="modal__content__container3"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  declinedOrder(results.table__number);
                }}
                style={{
                  backgroundColor: "black",
                }}
              >
                DECLINE
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  acceptedOrder(results.table__number);
                }}
                style={{
                  backgroundColor: "black",
                }}
              >
                ACCEPT
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const acceptedOrder = (tableNumber) => {
    set(
      ref(
        database,
        `active__orders/${auth.currentUser.uid}/${tableNumber}/order__status`
      ),
      "ACCEPTED"
    ).then(() => {
      window.location.reload();
    });
  };

  const declinedOrder = (tableNumber) => {
    set(
      ref(
        database,
        `active__orders/${auth.currentUser.uid}/${tableNumber}/order__status`
      ),
      "DECLINED"
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      className="card"
      style={{ border: "1px solid #dc3546", backgroundColor: "black" }}
    >
      <div className="card-header">
        <i className="fas fa-table me-1" />
        Orders Requests
      </div>
      <div className="card-body table-responsive">
        <table
          className="table"
          style={{ color: "white", backgroundColor: "black" }}
        >
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Table No.</th>
              <th>Table Id</th>
              <th>Number Of Members</th>
              <th>Total Bill</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>S.no.</th>
              <th>Table No.</th>
              <th>Table Id</th>
              <th>Number Of Members</th>
              <th>Total Bill</th>
            </tr>
          </tfoot>

          {/* <!--Table body--> */}
          <tbody>{renderOrderRequestTable()}</tbody>
          {/* <!--Table body--> */}
        </table>
        <div
          className="modal fade"
          id="modalForOrderRequests"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            {renderModalData()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderRequests;
