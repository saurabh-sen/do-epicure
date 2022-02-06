import { child, get, getDatabase, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { auth, database } from "../../../firebase";
import { actionTypes } from "../../../reducer.js";
import { useStateValue } from "../../../StateProvider";

var payments__request = [];

function PaymentRequests() {
  const [paymentsRequestState, setPaymentsRequestState] = useState([]);

  const [, dispatch] = useStateValue();

  useEffect(() => {
    // * change this to auth.currentuser.uid
    get(ref(database, `payments__request/${auth.currentUser.uid}/`)).then(
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          payments__request.push(childSnapshot.val());
        });
        payments__request = payments__request.filter(
          (result) => result.payment__status === ""
        );
        setPaymentsRequestState(payments__request);
      }
    );
  }, []);

  const finishOrder = (tableNumber) => {
    var childSnapshotKey = "";
    get(
      child(ref(getDatabase()), `manage__tables/${auth.currentUser.uid}/`)
    ).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let table__no = childSnapshot
          .child("manage__tables__table__number")
          .val();
        childSnapshotKey = childSnapshot.key;
        if (table__no === tableNumber) {
          set(
            ref(
              database,
              `manage__tables/${auth.currentUser.uid}/${childSnapshotKey}/manage__tables__table__status`
            ),
            "VACCANT"
          );
        }
      });
    });
    dispatch({ type: actionTypes.SET_TABLE_NUMBER, table_number: null });
    dispatch({ type: actionTypes.SET_TABLE_ID, table_id: null });
    dispatch({ type: actionTypes.SET_TOTAL_MENU_ITEM, total_menu_item: null });
    dispatch({ type: actionTypes.SET_CAFE_ID, cafe_id: null });
    dispatch({ type: actionTypes.SET_TOTAL_MEMBERS, total_members: null });
  };

  const renderPaymentRequests = () => {
    return paymentsRequestState.map((results, index) => {
      const { payment__mode, table__id, table__no, total__bill } = results; // destructuring

      return (
        <tr className="table-info" key={index}>
          <th scope="row">{index + 1}</th>
          <td>{table__no}</td>
          <td>{table__id}</td>
          <td>{payment__mode}</td>
          <td>{total__bill}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                finishOrder(table__no);
              }}
            >
              Accept And Finish Order.
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: "black", border: "1px solid #dc3546" }}
    >
      <div className="card-header">
        <i className="fas fa-table me-1" />
        Payments Requests
      </div>
      <div className="card-body table-responsive">
        <table className="table" style={{ color: "white" }}>
          <thead style={{ borderBottom: "2px solid #dc3546" }}>
            <tr>
              <th>S.No.</th>
              <th>Table No.</th>
              <th>Table Id</th>
              <th>Payment Options</th>
              <th>Total Bill</th>
              <th>Finish Order</th>
            </tr>
          </thead>
          <tfoot style={{ borderBottom: "2px solid #dc3546" }}>
            <tr>
              <th>S.No.</th>
              <th>Table No</th>
              <th>Table Id</th>
              <th>Payment Options</th>
              <th>Total Bill</th>
              <th>Finish Order</th>
              <th />
            </tr>
          </tfoot>

          {/* <!--Table body--> */}
          <tbody>{renderPaymentRequests()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentRequests;
