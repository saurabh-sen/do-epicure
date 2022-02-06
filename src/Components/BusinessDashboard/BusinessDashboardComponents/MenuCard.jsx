import React, { useState } from "react";
import "./EditProfile.css";
import { auth, database } from "../../../firebase";

import { Link } from "react-router-dom";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "@firebase/database";
import Alert from "../../HomePage/Alert";

function MenuCard({ changeMenuCardState }) {
  const [menuItemId, setMenuItemId] = useState("");

  const [deleteBtnState, setDeleteBtnState] = useState(false);

  const [alertState, setAlertState] = useState(null);

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

  const showMenuCard = () => {
    const db = getDatabase();

    // REPLACE UID WITH auth.currentUser.uid
    const databaseRef = ref(db, `digital__menu__cards/${auth.currentUser.uid}`);

    onValue(
      databaseRef,
      (snapshot) => {
        if (snapshot.exists()) {
          let total_menu_items = Object.keys(snapshot.val()).length;

          var myTable = "<tbody>";

          // FOR LOOP TO GENERATE TABLE FIELDS EQUAL TO THE TOTAL NUMBER OF ARRAY OBJECT IN DATABASE
          for (let i = 1; i <= total_menu_items; i++) {
            myTable += `<tr className="table-info">`;
            myTable += `<th  scope="row">${i}</th>
              <td>
                <input
                  style="border: 1px solid #dc3546;
                  background-color: black;"
                  type="text"
                  className="form-control inputBtnEditProfile"
                  id=menu_item${i}
                  value=""
                  />
                </td>
                <td>
                  <input
                  style="border: 1px solid #dc3546;
                  background-color: black;"
                  type="number"
                  className="form-control inputBtnEditProfile"
                  id=menu_item_half${i}
                  value=""
                  />
                </td>
                <td>
                  <input
                  style="border: 1px solid #dc3546;
                  background-color: black;"
                  type="number"
                  className="form-control inputBtnEditProfile"
                  id=menu_item_full${i}
                  value=""
                  />
                </td>`;
            myTable += "</tr>";
          }

          myTable += "</tbody>";

          document.getElementById("tablePrint").innerHTML = myTable;

          let count = 1;

          snapshot.forEach((childSnapshot) => {
            let item_name = childSnapshot
              .child("digital__menu__card__item__name")
              .val();

            let full_plate = childSnapshot
              .child("digital__menu__card__item__price__per__plate")
              .val();

            let half_plate = childSnapshot
              .child("digital__menu__card__item__price__per__half__plate")
              .val();
            document.getElementById(`menu_item${count}`).value = item_name;
            document.getElementById(`menu_item_half${count}`).value =
              half_plate;
            document.getElementById(`menu_item_full${count}`).value =
              full_plate;

            count = count + 1;
          });
        }
      },
      {
        onlyOnce: true,
      }
    );

    if (deleteBtnState === false) {
      setDeleteBtnState(true);
    }
  };

  const save_menu_item = () => {
    const dbRef = ref(getDatabase());

    // REPLACE UID WITH auth.currentUser.uid

    get(child(dbRef, `digital__menu__cards/${auth.currentUser.uid}`)).then(
      (snapshot) => {
        let total_menu_items = Object.keys(snapshot.val()).length;

        var data = [];

        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.key);
        });

        for (let i = 1; i <= total_menu_items; i++) {
          var menu_item_key_to_update = String(data[i - 1]);

          console.log(menu_item_key_to_update);

          set(
            ref(
              database,
              `digital__menu__cards/${auth.currentUser.uid}/${menu_item_key_to_update}`
            ),
            {
              digital__menu__card__item__name: document.getElementById(
                `menu_item${i}`
              ).value,
              digital__menu__card__item__price__per__half__plate:
                document.getElementById(`menu_item_half${i}`).value,
              digital__menu__card__item__price__per__plate:
                document.getElementById(`menu_item_full${i}`).value,
            }
          )
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        }

        showAlert(" Succuessfully Edited The Menu Card", "success");
      }
    );
  };

  const delete_menu_item = (event) => {
    event.preventDefault();

    // CHECKING FOR INPUT FIELD VALIDATION
    event.target.className += " was-validated";

    // REPLACE UID WITH auth.currentUs

    const dbRef = ref(getDatabase());
    get(child(dbRef, `digital__menu__cards/${auth.currentUser.uid}`)).then(
      (snapshot) =>
        snapshot.forEach((childSnapshot) => {
          if (
            String(document.getElementById(`menu_item${menuItemId}`).value) ===
            String(childSnapshot.child("digital__menu__card__item__name").val())
          ) {
            let menu_item_key = childSnapshot.key;
            remove(
              ref(
                database,
                `digital__menu__cards/${auth.currentUser.uid}/${menu_item_key}`
              )
            )
              .then(() => {
                console.log("delete successfully ");
                // TODO BREAK THE FOREACH LOOP USING SOME BRAIN
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log(
              "not matched item: " +
                childSnapshot.child("digital__menu__card__item__name").val()
            );
          }
        })
    );

    showAlert(
      " Successfully DELETED Menu Item and you will see changes in your menu card soon",
      "success"
    );
  };

  return (
    <div className="card" style={{ backgroundColor: "black", color: "white" }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ margin: "2em", marginBottom: "1rem" }}
      >
        <button
          className="d-flex flex-row align-items-center"
          onClick={() => {
            changeMenuCardState();
          }}
          style={{
            backgroundColor: "transparent",
            outline: "0",
            border: "0",
          }}
        >
          <i className="fa fa-long-arrow-alt-left mr-1 mb-1"></i>
          <h6>Back To Dashboard</h6>
        </button>
        <div className="d-flex flex-row align-items-center">
          <button
            onClick={showMenuCard}
            className="btn text-right profile-button"
          >
            Show Menu Card
          </button>
        </div>
      </div>
      <hr style={{ opacity: "1", color: "#dc3546" }} />

      <Alert alertState={alertState} />

      <div className="card-body table-responsive">
        <table className="table">
          <thead style={{ color: "white", borderBottom: "2px solid #dc3546" }}>
            <tr>
              <th>S.no.</th>
              <th>Menu Item</th>
              <th>Price of 1/2P</th>
              <th>Price of 1P</th>
            </tr>
          </thead>

          {/* <!--Table body--> */}
          <tbody
            id="tablePrint"
            style={{
              borderBottom: "2px solid #dc3546",
              color: "white",
            }}
          ></tbody>
          {/* <!--Table body--> */}
        </table>
      </div>
      <div style={{ marginLeft: "auto", marginBottom: "31px" }}>
        <button
          className="btn profile-button"
          onClick={save_menu_item}
          style={{ margin: "0 26px" }}
        >
          Save
        </button>
        <Link
          to="/addnewmenuitem"
          className="btn profile-button"
          style={{ margin: "0 26px" }}
        >
          Add New Row
        </Link>
      </div>
      {deleteBtnState ? (
        <form
          className="card-body table-responsive needs-validation"
          onSubmit={delete_menu_item}
          style={{
            display: "flex",
            margin: "auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            value={menuItemId}
            onChange={(e) => setMenuItemId(e.target.value)}
            type="number"
            placeholder="Enter serial number of Item to delete"
            className="form-control inputBtnEditProfile"
            style={{
              width: "250px",
              height: "40px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
            required
          />
          <button
            className="btn profile-button"
            type="submit"
            style={{ height: "39px" }}
          >
            DELETE
          </button>
        </form>
      ) : (
        " "
      )}
    </div>
  );
}

export default MenuCard;
