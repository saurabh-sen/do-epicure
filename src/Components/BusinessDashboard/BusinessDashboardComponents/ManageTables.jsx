import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref, set } from "@firebase/database";

import { auth, database } from "../../../firebase";
import "./EditProfile.css";
import Alert from "../../HomePage/Alert";

var total__tables = 0;

function ManageTables() {
  let navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const [alertState, setAlertState] = useState(null);

  const [total__tables__array__state, setTotal__tables__array__state] =
    useState([]);

  // SHOWALERT FUNCTION START
  const showAlert = (message, type) => {
    setAlertState({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlertState(null);
    }, 10000);
  };
  // SHOWALERT FUNCTION END

  useEffect(() => {
    var total__tables__array = [];
    if (auth.currentUser !== null) {
      // if error comes move this array above useEffects
      const dbRef = ref(getDatabase());
      get(
        child(dbRef, `verified__business__profile/${auth.currentUser.uid}`)
      ).then((snapshot) => {
        total__tables = snapshot
          .child("verified__business__total__tables")
          .val();
        for (let i = 1; i <= total__tables; i++) {
          total__tables__array.push(i);
        }
        setTotal__tables__array__state(total__tables__array);
      });
    } else {
      navigate("/restaurant-login", { replace: true });
    }
  }, [navigate]);

  const save__manage__table__data = () => {
    var total__tables__verified__business = 0;
    const dbRef = ref(getDatabase());
    get(
      child(dbRef, `verified__business__profile/${auth.currentUser.uid}`)
    ).then((snapshot) => {
      total__tables__verified__business = snapshot
        .child("verified__business__total__tables")
        .val();
      for (let i = 1; i <= total__tables__verified__business; i++) {
        var tables_key_to_update = document.getElementById(
          `table_no_${i}`
        ).value;
        set(
          ref(
            database,
            `manage__tables/${auth.currentUser.uid}/${tables_key_to_update}`
          ),
          {
            manage__tables__table__number: document.getElementById(
              `table_no_${i}`
            ).value,
            manage__tables__table__id: document.getElementById(`table_id_${i}`)
              .value,
            manage__tables__table__status: "VACCANT",
          }
        )
          .then(() => {
            showAlert(" Succuessfully Saved", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const setValuesOnTheTable = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `manage__tables/${auth.currentUser.uid}`)).then(
      (snapshot) => {
        var count = 1;
        snapshot.forEach((childSnapshot) => {
          let table_number_from_db = childSnapshot
            .child("manage__tables__table__number")
            .val();
          let table_id_from_db = childSnapshot
            .child("manage__tables__table__id")
            .val();
          let table_status_from_db = childSnapshot
            .child("manage__tables__table__status")
            .val();
          if (
            table_number_from_db &&
            table_id_from_db &&
            table_status_from_db
          ) {
            document.getElementById(`table_no_${count}`).value =
              table_number_from_db;
            document.getElementById(`table_id_${count}`).value =
              table_id_from_db;
            document.getElementById(`table_status_${count}`).innerText =
              table_status_from_db;
          }
          count += 1;
        });
      }
    );
    setFlag(true);
  };

  const renderManageTable = () => {
    setTimeout(() => {
      setValuesOnTheTable();
    }, 3000);
    return total__tables__array__state.map((e, i) => (
      <tr className="table-info" key={i}>
        <th scope="row">{i + 1}</th>
        <td>
          <input
            style={{ border: "1px solid black" }}
            type="number"
            className="form-control"
            id={`table_no_${i + 1}`}
            placeholder="Table No."
          />
        </td>
        <td>
          <input
            style={{ border: "1px solid black" }}
            type="text"
            className="form-control"
            id={`table_id_${i + 1}`}
            placeholder="Table Id"
          />
        </td>
        <td id={`table_status_${i + 1}`}></td>
      </tr>
    ));
  };

  return (
    <div
      style={{
        backgroundColor: "black !important",
        border: "1px solid #dc3546",
        paddingBottom: "1.5rem!important",
      }}
    >
      <div className="card-header">
        <i className="fas fa-table me-1" />
        Manage Your tables Manually
      </div>
      <Alert alertState={alertState} />
      <div className="card-body table-responsive">
        <table className="table">
          <thead style={{ color: "white" }}>
            <tr>
              <th>S.no.</th>
              <th>Table No.</th>
              <th>Table Id</th>
              <th>status of Table</th>
            </tr>
          </thead>
          <tbody>{renderManageTable()}</tbody>
          {/* <!--Table body--> */}
        </table>
        <button
          className="btn profile-button"
          onClick={save__manage__table__data}
          style={{
            marginLeft: "auto",
            marginRight: "10em",
            display: "flex",
            width: "10%",
            justifyContent: "center",
            backgroundColor: "black",
            border: "1px solid #dc3546",
          }}
          disabled={flag === false}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ManageTables;
