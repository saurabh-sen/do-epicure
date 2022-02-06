import { onAuthStateChanged } from "@firebase/auth";
import { child, getDatabase, ref, set, get } from "@firebase/database";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Alert from "../../HomePage/Alert";
import { auth, database } from "../../../firebase";

function AddMenuItem() {

  const [menuItem, setMenuItem] = useState("");

  const [pricePerPlate, setPricePerPlate] = useState("");

  const [pricePerHalfPlate, setPricePerHalfPlate] = useState("");

  const [alertState, setAlertState] = useState(null);

  // CHECKING USER IS BUSINESS RELATED OR NOT START
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      
      if (user != null) {
        get(ref(database, `registered__business/${user.uid}/${user.displayName}`))
       .then((snapshot) => {
    
         var business_email = snapshot.child("registered__business__email").val();
    
         if (String(user.email) === String(business_email)) {
    
           // USER IS RELATED TO BUSINESS, HE IS NOT A INTRUDER (;
    
         } else {
           // console.log("email is not matched ")
    
           navigate('/restaurant-login', { replace: true })
         }
       })
      }else {
        navigate('/restaurant-login', { replace: true })
      }
  
    });
    // CHECKING USER IS BUSINESS RELATED OR NOT END
  }, [navigate]);
  

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

  const addNewMenuItem = async(event) => {
    event.preventDefault();
    
    // CHECKING FOR INPUT FIELD VALIDATION
    event.target.className += " was-validated";
    
    if (menuItem && pricePerPlate && pricePerHalfPlate) {
      
      // REPLACE UID WITH auth.currentUser.uid
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `digital__menu__cards/${auth.currentUser.uid}`)).then((snapshot) => {
        var last_menu_item_key = 0;
        snapshot.forEach((childSnapshot) => {
          last_menu_item_key = Number(childSnapshot.key)
        });
        
        writeNewMenuCard(
          auth.currentUser.uid,
          menuItem,
          pricePerPlate,
          pricePerHalfPlate,
          Number(last_menu_item_key)+1
        );

      })

    } else {
      showAlert(" Please Fill All Input Fields", "danger");
    }
  };

  const writeNewMenuCard = (
    userId,
    menuItem,
    pricePerPlate,
    pricePerHalfPlate,
    last_menu_item_key
  ) => {
    // SET FUNCTION OVERWRITES THE INFORMATION AT GIVEN ADDRESS, IF NO DATA FOUND THEN IT WILL DO WRITE ONLY
    set(
      ref(
        database,
        "digital__menu__cards/" + userId + `/${last_menu_item_key}`
      ),
      {
        digital__menu__card__item__name: menuItem,
        digital__menu__card__item__price__per__half__plate: pricePerHalfPlate,
        digital__menu__card__item__price__per__plate: pricePerPlate,
      }
    )
      .then(() => {
        showAlert(" New Menu Item Has Been Added", "success");
      })
      .catch((error) => {
        console.log(error);
      });

      // RESET THE INPUT FIELDS TO FILL AGAIN
      document.getElementById("myForm").reset();
  };

  return (
    <>
      <div
        className="addMenuItem"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "5vh",
          backgroundColor: "black", 
          color: "white", 
          height: "100vh",
        }}
      >
        <div className="d-flex flex-row align-items-center">
          <Link to="/businessdashboard" style={{ display: "flex", }} >
            <i className="fas fa-edit mr-1 mb-1"></i>
            <h6>Back to Dashboard</h6>
          </Link>
        </div>
        <form
        id="myForm"
          className="card-body table-responsive needs-validation"
          onSubmit={addNewMenuItem}
        >
          <table className="table">
            <thead style={{ color: "white", }} >
              <tr>
                <th>Menu Item</th>
                <th>Price of 1P</th>
                <th>Price of 1/2P</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-info">
                <td>
                  <input
                    value={menuItem}
                    onChange={(e) => setMenuItem(e.target.value)}
                    type="text"
                    placeholder="New Menu Item"
                    className="form-control inputBtnEditProfile"
                    required
                  />
                </td>
                <td>
                  <input
                    value={pricePerPlate}
                    onChange={(e) => setPricePerPlate(e.target.value)}
                    type="number"
                    placeholder="Menu Item Price Per Plate"
                    className="form-control inputBtnEditProfile"
                    required
                  />
                </td>
                <td>
                  <input
                    value={pricePerHalfPlate}
                    onChange={(e) => setPricePerHalfPlate(e.target.value)}
                    type="number"
                    placeholder="Menu Item Price Per Plate"
                    className="form-control inputBtnEditProfile"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Alert alertState={alertState} />
          <button
            className="btn profile-button"
            type="submit"
            style={{ marginLeft: "43%" }}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddMenuItem;
