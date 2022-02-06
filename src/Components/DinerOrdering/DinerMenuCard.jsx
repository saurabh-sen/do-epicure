import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { child, get, getDatabase, onValue, ref, set } from "@firebase/database";
import { useNavigate } from "react-router";

import { useStateValue } from "../../StateProvider";
import { auth, database } from "../../firebase";
import Alert from "../HomePage/Alert";
import "./DinerMenuCard.css";
import { onAuthStateChanged } from "@firebase/auth";
import { Loading } from "../Loading/Loading";

var menuCardRowData = [];

var disableOrderInfoBox = false;

function DinerMenuCard() {
  const [{ cafe_id, table_id, total_members, table_number }] = useStateValue();

  const [menuCardRowDataState, setMenuCardRowDataState] = useState([]);

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const [alertState, setAlertState] = useState(null);

  let navigate = useNavigate();

  // TAKE OUT TABLE NUMBER AND TOTAL DINERS FROM THIS PARAMS
  let params = useParams();

  // CHANGE THE GvFsAcbA4KMaE3n1qHd8qwkw09A3 TO cafe_id
  useEffect(() => {
    menuCardRowData.length = 0;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `digital__menu__cards/${cafe_id}`))
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          menuCardRowData.push(childSnapshot.val());
        });
        setMenuCardRowDataState(menuCardRowData);
      })
      .catch((error) => console.log(error));

    onAuthStateChanged(auth, (user) => {
      console.log(user.displayName);
      if (user != null) {
        get(ref(database, `registered__diners/${user.uid}`)).then(
          (snapshot) => {
            var diner_email = snapshot.child("registered__diner__email").val();

            if (String(user.email) === String(diner_email) && table_number) {
              // USER IS RELATED TO BUSINESS, HE IS NOT A INTRUDER (;
              navigate(`/menucard${table_number}`, { replace: true });
            } else {
              navigate(`/diner-login`, { replace: true });
            }
          }
        );
      } else {
        navigate(`/diner-login`, { replace: true });
      }
    });

    // remove cafe_id from dependency array if any problem arrives
  }, [cafe_id, navigate, table_number]);

  // SHOWALERT FUNCTION START
  const showAlert = (message, type) => {
    setAlertState({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlertState(null);
      navigate("/", { replace: true });
    }, 4000);
  };
  // SHOWALERT FUNCTION END

  var total__order__price = 0;
  const incrementHalfPlate = (
    element__id,
    digital__menu__card__item__price__per__half__plate
  ) => {
    let variables = Number(
      document.getElementById(`half__plate__${element__id}`).innerText
    );
    variables += 1;
    document.getElementById(`half__plate__${element__id}`).innerText =
      variables;

    if (
      Number(
        document.getElementById(`half__plate__${element__id}`).innerText
      ) !== 0
    ) {
      document.getElementById(`half__plate__price__${element__id}`).innerText =
        Number(
          document.getElementById(`half__plate__${element__id}`).innerText
        ) * Number(digital__menu__card__item__price__per__half__plate);
    }
    for (let i = 1; i <= menuCardRowDataState.length; i++) {
      if (
        Number(document.getElementById(`half__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`half__plate__price__${i}`).innerText
        );
      }
      if (
        Number(document.getElementById(`full__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`full__plate__price__${i}`).innerText
        );
      }
    }
    setTotalOrderPrice(total__order__price);
  };

  const decrementHalfPlate = (
    element__id,
    digital__menu__card__item__price__per__half__plate
  ) => {
    let variables = Number(
      document.getElementById(`half__plate__${element__id}`).innerText
    );
    if (variables > 0) {
      variables -= 1;
      document.getElementById(`half__plate__${element__id}`).innerText =
        variables;
    }

    if (
      Number(
        document.getElementById(`half__plate__${element__id}`).innerText
      ) !== 0
    ) {
      document.getElementById(`half__plate__price__${element__id}`).innerText =
        Number(
          document.getElementById(`half__plate__${element__id}`).innerText
        ) * Number(digital__menu__card__item__price__per__half__plate);
    }
    for (let i = 1; i <= menuCardRowDataState.length; i++) {
      if (
        Number(document.getElementById(`half__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`half__plate__price__${i}`).innerText
        );
      }
      if (
        Number(document.getElementById(`full__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`full__plate__price__${i}`).innerText
        );
      }
    }
    setTotalOrderPrice(total__order__price);
  };

  const incrementFullPlate = (
    element__id,
    digital__menu__card__item__price__per__plate
  ) => {
    let variables = Number(
      document.getElementById(`full__plate__${element__id}`).innerText
    );
    variables += 1;
    document.getElementById(`full__plate__${element__id}`).innerText =
      variables;

    if (
      Number(
        document.getElementById(`full__plate__${element__id}`).innerText
      ) !== 0
    ) {
      document.getElementById(`full__plate__price__${element__id}`).innerText =
        Number(
          document.getElementById(`full__plate__${element__id}`).innerText
        ) * Number(digital__menu__card__item__price__per__plate);
    }
    for (let i = 1; i <= menuCardRowDataState.length; i++) {
      if (
        Number(document.getElementById(`half__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`half__plate__price__${i}`).innerText
        );
      }
      if (
        Number(document.getElementById(`full__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`full__plate__price__${i}`).innerText
        );
      }
    }
    setTotalOrderPrice(total__order__price);
  };

  const decrementFullPlate = (
    element__id,
    digital__menu__card__item__price__per__plate
  ) => {
    let variables = Number(
      document.getElementById(`full__plate__${element__id}`).innerText
    );
    if (variables > 0) {
      variables -= 1;
      document.getElementById(`full__plate__${element__id}`).innerText =
        variables;
    }

    if (
      Number(
        document.getElementById(`full__plate__${element__id}`).innerText
      ) !== 0
    ) {
      document.getElementById(`full__plate__price__${element__id}`).innerText =
        Number(
          document.getElementById(`full__plate__${element__id}`).innerText
        ) * Number(digital__menu__card__item__price__per__plate);
    }
    for (let i = 1; i <= menuCardRowDataState.length; i++) {
      if (
        Number(document.getElementById(`half__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`half__plate__price__${i}`).innerText
        );
      }
      if (
        Number(document.getElementById(`full__plate__${i}`).innerText) !== 0
      ) {
        total__order__price += Number(
          document.getElementById(`full__plate__price__${i}`).innerText
        );
      }
    }
    setTotalOrderPrice(total__order__price);
  };

  const orderMenu = async () => {
    var table__number__from__param = params.table_number
      ? params.table_number
      : table_number;
    // * total members from data layer
    var total__members = total_members;
    // * table id from data layer
    var table__id = table_id;
    await set(
      ref(database, `active__orders/${cafe_id}/${table__number__from__param}/`),
      {
        total__bill: totalOrderPrice,
        total__diners: total__members,
        table__id: table__id,
        table__number: table__number__from__param,
        order__status: " ",
      }
    );

    for (let i = 1; i <= menuCardRowDataState.length; i++) {
      if (
        Number(document.getElementById(`half__plate__${i}`).innerText) !== 0 ||
        Number(document.getElementById(`full__plate__${i}`).innerText) !== 0
      ) {
        var item__name = String(
          document.getElementById(`menu__item${i}`).innerText
        );
        var half__plate__value = Number(
          document.getElementById(`half__plate__${i}`).innerText
        );
        var full__plate__value = Number(
          document.getElementById(`full__plate__${i}`).innerText
        );
        await set(
          ref(
            database,
            `active__orders/${cafe_id}/${table__number__from__param}/items/${item__name}/`
          ),
          {
            full__plate: full__plate__value,
            half__plate: half__plate__value,
          }
        )
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const renderMenuCard = () => {
    return menuCardRowDataState.map((results, index) => {
      const {
        digital__menu__card__item__name,
        digital__menu__card__item__price__per__half__plate,
        digital__menu__card__item__price__per__plate,
      } = results; //destructuring

      return (
        <tr key={index + 1}>
          <td id={`menu__item${index + 1}`}>
            {digital__menu__card__item__name}
          </td>
          <td>
            <div className="diner__menu__card__td">
              <div className="diner__menu__card__td__counter">
                <button
                  className="diner__menu__card__p"
                  onClick={() => {
                    incrementHalfPlate(
                      `${index + 1}`,
                      digital__menu__card__item__price__per__half__plate
                    );
                  }}
                >
                  +
                </button>
                <p id={`half__plate__${index + 1}`}>0</p>
                <button
                  className="diner__menu__card__p"
                  onClick={() => {
                    decrementHalfPlate(
                      `${index + 1}`,
                      digital__menu__card__item__price__per__half__plate
                    );
                  }}
                >
                  -
                </button>
              </div>
              ₹
              <p id={`half__plate__price__${index + 1}`}>
                {digital__menu__card__item__price__per__half__plate}
              </p>
            </div>
          </td>
          <td>
            <div className="diner__menu__card__td">
              <div className="diner__menu__card__td__counter">
                <button
                  className="diner__menu__card__p"
                  onClick={() => {
                    incrementFullPlate(
                      `${index + 1}`,
                      digital__menu__card__item__price__per__plate
                    );
                  }}
                >
                  +
                </button>
                <p id={`full__plate__${index + 1}`}>0</p>
                <button
                  className="diner__menu__card__p"
                  onClick={() => {
                    decrementFullPlate(
                      `${index + 1}`,
                      digital__menu__card__item__price__per__plate
                    );
                  }}
                >
                  -
                </button>
              </div>
              ₹
              <p id={`full__plate__price__${index + 1}`}>
                {digital__menu__card__item__price__per__plate}
              </p>
            </div>
          </td>
        </tr>
      );
    });
  };

  // setTimeout(() => {
  const db = getDatabase();
  var table__number__from__param = params.table_number
    ? params.table_number
    : table_number;
  onValue(
    ref(db, `active__orders/${cafe_id}/${table__number__from__param}/`),
    (snapshot) => {
      const data = snapshot.child("order__status").val();
      if (data !== " ") {
        disableOrderInfoBox = true;
      }
      if (data === "DECLINED") {
        showAlert(" Your request has been declined", "danger");
      }
    }
  );
  // }, 5000);

  const handlePayMent = (payment_mode) => {
    var table__number__from__param = 13;

    // * table id from data layer
    var table__id = table_id;
    set(
      ref(
        database,
        `payments__request/${cafe_id}/${table__number__from__param}/`
      ),
      {
        table__no: table__number__from__param,
        table__id: table__id,
        payment__mode: payment_mode,
        total__bill: totalOrderPrice,
        payment__status: "",
      }
    ).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="diner__menu__card__container">
      <div
        className="body dark-background"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/nrmkm7d/five-bells-washed-out-logo.png) , linear-gradient(to right, rgba(58, 61, 62, 1) 0%, rgba(58, 61, 62, 1) 100%)",
          height: "auto",
        }}
      >
        <div className="outer-border">
          <div className="mid-border">
            <div className="inner-border">
              <img
                className="corner-decoration corner-left-top"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt=""
              />
              <img
                className="corner-decoration corner-right-top"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt=""
              />
              <img
                className="corner-decoration corner-right-bottom"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt=""
              />
              <img
                className="corner-decoration corner-left-bottom"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt=""
              />
              <img
                className="vertical-decoration top"
                src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                alt=""
              />
              <img
                className="vertical-decoration bottom"
                src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                alt=""
              />

              {/* Page Content */}
              <div
                className="container__menu__card"
                style={{
                  marginTop: "100px",
                }}
              >
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <p className="lead skintone-text">
                      <span className="name skintone-text countach"></span>
                      <span
                        className="place skintone-text tilda-petite"
                        style={{
                          fontSize: "40px",
                        }}
                      >
                        Have Some Best Food For Yourself and Family
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="container__main"
                style={{
                  margin: "2vw",
                }}
              >
                <div className="menu__card__container__table">
                  <table
                    className="table"
                    style={{
                      color: "white",
                      fontSize: "1.0em",
                      borderColor: "#DE9B72",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#de9b723d",
                        }}
                      >
                        <th
                          className="table__th table__th__menu"
                          scope="col"
                          style={{
                            paddingRight: "25vw",
                          }}
                        >
                          Menu
                        </th>
                        <th className="table__th" scope="col">
                          <div className="diner__menu__card__th">
                            Half Price
                          </div>
                        </th>
                        <th className="table__th" scope="col">
                          <div className="diner__menu__card__th">
                            full Price
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderMenuCard()}</tbody>
                  </table>
                  <div className="diner__menu__card__order__button">
                    <button
                      id="order__submit__button"
                      style={{
                        backgroundColor: "#de9b7259",
                        color: "white",
                        padding: "9px",
                        borderRadius: "3px",
                        border: "2px solid #de9b72",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#orderTrackingModal"
                      disabled={totalOrderPrice < 1}
                      onClick={orderMenu}
                    >
                      Order Meal For ₹{totalOrderPrice}
                    </button>
                  </div>

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="orderTrackingModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div
                        className="modal-content"
                        style={{
                          color: "white",
                          boxShadow: "0px 0px 20px 0.1rem rgb(220 53 69)",
                          borderColor: "#dc3545",
                          backgroundColor: "#2c1818e3",
                        }}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">
                            Track Your Order Here.
                          </h5>
                          <Alert alertState={alertState} />
                        </div>
                        <div className="modal-body">
                          <div className="container">
                            {disableOrderInfoBox !== true ? (
                              <Loading />
                            ) : (
                              <div className="timeline">
                                <div className="timeline-container">
                                  <div
                                    className={`timeline-icon ${
                                      disableOrderInfoBox === true
                                        ? ""
                                        : "decrease__opacity"
                                    }`}
                                  >
                                    <i className="far fa-grin-beam-sweat"></i>
                                  </div>
                                  <div className="timeline-body">
                                    <h4 className="timeline-title">
                                      <span
                                        className={`badge ${
                                          disableOrderInfoBox === true
                                            ? ""
                                            : "decrease__opacity"
                                        }`}
                                      >
                                        Order Request
                                      </span>
                                    </h4>
                                    <p
                                      className={`${
                                        disableOrderInfoBox === true
                                          ? ""
                                          : "decrease__opacity"
                                      }`}
                                    >
                                      Your request for your tasty food is on the
                                      way 😋. You'll be get our response here
                                      only🤩, So stick to this message👌🏻.
                                    </p>
                                    <p className="timeline-subtitle">
                                      This May Take 60 Sec
                                    </p>
                                  </div>
                                </div>
                                <div className="timeline-container danger">
                                  <div
                                    className={`timeline-icon ${
                                      disableOrderInfoBox === true
                                        ? ""
                                        : "decrease__opacity"
                                    }`}
                                  >
                                    <i className="far fa-grin-hearts"></i>
                                  </div>
                                  <div className="timeline-body">
                                    <h4 className="timeline-title">
                                      <span
                                        className={`badge ${
                                          disableOrderInfoBox === true
                                            ? ""
                                            : "decrease__opacity"
                                        }`}
                                      >
                                        Food Served
                                      </span>
                                    </h4>
                                    <p
                                      className={`${
                                        disableOrderInfoBox === true
                                          ? ""
                                          : "decrease__opacity"
                                      }`}
                                    >
                                      Here is your tasty food, eat enjoy and
                                      don't be shy 🤗. But don't forget to wash
                                      your Hands first. Ok see you soon.
                                    </p>
                                    <p className="timeline-subtitle">
                                      Don't Shy Eat Well
                                    </p>
                                  </div>
                                </div>
                                <div className="timeline-container success">
                                  <div
                                    className={`timeline-icon ${
                                      disableOrderInfoBox === true
                                        ? ""
                                        : "decrease__opacity"
                                    }`}
                                  >
                                    <i className="fas fa-rupee-sign"></i>
                                  </div>
                                  <div className="timeline-body">
                                    <h4 className="timeline-title">
                                      <span
                                        className={`badge ${
                                          disableOrderInfoBox === true
                                            ? ""
                                            : "decrease__opacity"
                                        }`}
                                      >
                                        Payment
                                      </span>
                                    </h4>
                                    <p
                                      className={`${
                                        disableOrderInfoBox === true
                                          ? ""
                                          : "decrease__opacity"
                                      }`}
                                    >
                                      Its payment time😃, We provide various
                                      payment methods ONLINE as well as OFFLINE.
                                      Pay via most secure and your favorite
                                      payment gateways.
                                    </p>
                                    <p className="timeline-subtitle">
                                      This will take Few Minutes
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className={`btn btn-success ${
                              disableOrderInfoBox === true
                                ? ""
                                : "decrease__opacity"
                            }`}
                            data-bs-dismiss="modal"
                            style={{ backgroundColor: "transparent" }}
                            disabled={!disableOrderInfoBox}
                            onClick={() => {
                              handlePayMent("cash");
                            }}
                          >
                            Pay Cash.
                          </button>
                          <button
                            type="button"
                            className={`btn btn-success ${
                              disableOrderInfoBox === true
                                ? ""
                                : "decrease__opacity"
                            }`}
                            data-bs-dismiss="modal"
                            style={{ backgroundColor: "transparent" }}
                            disabled={!disableOrderInfoBox}
                            onClick={() => {
                              handlePayMent("online");
                            }}
                          >
                            Pay Online.
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Modal END --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DinerMenuCard;
