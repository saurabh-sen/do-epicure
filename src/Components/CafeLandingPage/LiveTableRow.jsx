import { get, getDatabase, ref, child, set } from "@firebase/database";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import "./LiveTableRow.css";
import { database } from "../../firebase.js";

var rowData = [];

function LiveTableRow({ id }) {
  const [, dispatch] = useStateValue();

  const [rowDataState, setRowDataState] = useState([]);

  const [tableNumber, setTableNumber] = useState();

  const [tableId, setTableId] = useState("");

  const [total_member, setTotal_member] = useState(1);

  let navigate = useNavigate();

  useEffect(() => {
    rowData.length = 0;
    get(ref(database, `manage__tables/${id}/`)).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        rowData.push(childSnapshot.val());
      });
      rowData = rowData.filter(
        (result) => result.manage__tables__table__status === "VACCANT"
      );
      setRowDataState(rowData);
    });
  }, [id]);

  const requestForBookTable = (ev) => {
    setTableNumber(ev.currentTarget.dataset.div_id);
  };

  const confirmBooking = async () => {
    const dbRef = ref(getDatabase());
    var childSnapshotKey = "";
    get(child(dbRef, `manage__tables/${id}`)).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (
          childSnapshot.child("manage__tables__table__number").val() ===
            tableNumber &&
          tableId === childSnapshot.child("manage__tables__table__id").val()
        ) {
          childSnapshotKey = childSnapshot.key;

          // REACT CONTEXT API TO TABLE NUMBER OF BOOKED TABLE BY THE USER
          dispatch({
            type: actionTypes.SET_TABLE_NUMBER,
            table_number: tableNumber,
          });
          dispatch({ type: actionTypes.SET_CAFE_ID, cafe_id: id });
          dispatch({
            type: actionTypes.SET_TOTAL_MEMBERS,
            total_members: total_member,
          });
          dispatch({ type: actionTypes.SET_TABLE_ID, table_id: tableId });

          set(
            ref(
              database,
              `manage__tables/${id}/${childSnapshotKey}/manage__tables__table__status`
            ),
            "OCCUPIED"
          )
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });

          // NAVIGATE TO LOGIN PAGE
          navigate("/diner-login", { replace: true });
        }
      });
    });
  };

  const renderlist = rowDataState.map((results, index) => (
    <tr
      key={results.manage__tables__table__number}
      style={{ borderBottom: "1px solid #de3446" }}
    >
      <th scope="row">
        {index + 1}
        {")."}
      </th>
      <td>{results.manage__tables__table__number}</td>
      <td>
        <button
          key={results.manage__tables__table__number}
          type="button"
          className="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          id="buttonn"
          data-div_id={results.manage__tables__table__number}
          onClick={requestForBookTable}
        >
          Book Table
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <tbody>
        {renderlist}

        {/* IF ANY ERROR COMES RELATED MODAL THEN REMOVE THIS TABLE ROW AND TABLE DATA */}
        <tr>
          <td style={{ borderColor: "transparent" }}>
            <div
              className="modal fade"
              role="dialog"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-lg"
                style={{
                  boxShadow: "0px 0px 20px 0.1rem rgb(220 53 69)",
                  borderColor: "#dc3545",
                  backgroundColor: "#232323e3",
                  color: "black",
                }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Book Table {tableNumber}
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="table-id" className="col-form-label">
                          Input Table Id
                        </label>
                        <input
                          type="text"
                          placeholder="Table Id"
                          className="form-control"
                          id="table-id"
                          value={tableId}
                          onChange={(e) => setTableId(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="total_member"
                          className="col-form-label"
                        >
                          Total Diners
                        </label>
                        <input
                          type="number"
                          placeholder="Total Diners"
                          className="form-control"
                          id="total_member"
                          value={total_member}
                          onChange={(e) => setTotal_member(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger cancel_booking"
                      data-bs-dismiss="modal"
                    >
                      Cancel Booking
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success confirm_booking"
                      id="confirm_booking"
                      data-bs-dismiss="modal"
                      disabled={tableId.length < 1}
                      onClick={confirmBooking}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default LiveTableRow;
