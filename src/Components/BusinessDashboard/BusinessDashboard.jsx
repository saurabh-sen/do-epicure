import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, ref } from "@firebase/database";
import { onAuthStateChanged, signOut } from "@firebase/auth";

import Footer from "../HomePage/Footer";
import ManageTables from "./BusinessDashboardComponents/ManageTables";
import ActiveOrders from "./BusinessDashboardComponents/ActiveOrders";
import OrderRequests from "./BusinessDashboardComponents/OrderRequests";
import PaymentRequests from "./BusinessDashboardComponents/PaymentRequests";
import MenuCard from "./BusinessDashboardComponents/MenuCard";

import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { auth, database } from "../../firebase";

function BusinessDashboard() {
  const [, dispatch] = useStateValue();

  const [activeOrders, setactiveOrders] = useState(false);

  const [orderRequests, setOrderRequests] = useState(false);

  const [paymentRequests, setPaymentRequests] = useState(false);

  const [menuCardState, setMenuCardState] = useState(false);

  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      get(
        ref(database, `registered__business/${user.uid}/${user.displayName}`)
      ).then((snapshot) => {
        var business_email = snapshot
          .child("registered__business__email")
          .val();

        if (
          String(user.email) === String(business_email) &&
          user.emailVerified !== false
        ) {
          // USER IS RELATED TO BUSINESS, HE IS NOT A INTRUDER (;
        } else {
          signOutBusinessUser();
          navigate("/restaurant-login", { replace: true });
        }
      });
    } else {
      navigate("/restaurant-login", { replace: true });
    }
  });

  // const activeOrdersFunction = () => {
  //   if (activeOrders === true) {
  //     setactiveOrders(false);
  //     setOrderRequests(false);
  //     setPaymentRequests(false);
  //   } else {
  //     setactiveOrders(true);
  //     setOrderRequests(false);
  //     setPaymentRequests(false);
  //   }
  // };

  const orderRequestsFunction = () => {
    if (orderRequests === true) {
      setOrderRequests(false);
      setactiveOrders(false);
      setPaymentRequests(false);
    } else {
      setOrderRequests(true);
      setactiveOrders(false);
      setPaymentRequests(false);
    }
  };

  const paymentRequestsFunction = () => {
    if (paymentRequests === true) {
      setPaymentRequests(false);
      setactiveOrders(false);
      setOrderRequests(false);
    } else {
      setPaymentRequests(true);
      setactiveOrders(false);
      setOrderRequests(false);
    }
  };

  const menuCard = () => {
    if (menuCardState === false) {
      setMenuCardState(true);
    } else {
      setMenuCardState(false);
    }
  };

  const handleChange = () => {
    setMenuCardState(false);
  };

  const signOutBusinessUser = () => {
    // SIGNOUT USER FUNCTION
    signOut(auth)
      .then(() => {
        dispatch({ type: actionTypes.SET_BUSINESS_USER, business_user: null });
        changeUrl(navigate);
      })
      .catch((error) => console.log(error.message));
  };

  const changeUrl = (navigate) => {
    navigate("/restaurant-login", { replace: true });
  };

  const showTables = (activeOrders, orderRequests, paymentRequests) => {
    switch (true) {
      case activeOrders === true:
        return <ActiveOrders />;

      case orderRequests === true:
        return <OrderRequests />;

      case paymentRequests === true:
        return <PaymentRequests />;

      default:
        return <ManageTables />;
    }
  };

  return (
    <div>
      <nav
        className="sb-topnav navbar navbar-expand navbar-black bg-black"
        style={{
          paddingBottom: "30px",
          position: "relative",
          WebkitBoxPack: "space-between",
          WebkitJustifyContent: "space-between",
          msFlexPack: "space-between",
          justifyContent: "space-between",
        }}
      >
        {/* Navbar Brand*/}
        <Link className="navbar-brand" to="/" style={{ marginLeft: "6vw" }}>
          <p
            className="logo__text"
            style={{
              fontFamily: "Mea Culpa",
              fontSize: "50px",
              color: "white",
            }}
          >
            Epicure
          </p>
        </Link>

        {/* Navbar*/}
        <div className="dropstart" style={{ marginRight: "12vw" }}>
          <div
            className="dropdown-toggle"
            role="button"
            id="dropdownMenuLinkAvatar"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            {" "}
            Menu
          </div>

          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuLinkAvatar"
            style={{ backgroundColor: "black", border: "2px solid #dc3546" }}
          >
            <Link
              className="dropdown-item"
              to="/editbusinessprofile"
              style={{
                backgroundColor: "transparent",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Edit Business Profile
            </Link>

            <hr
              className="dropdown-divider"
              style={{ color: "#dc3546", height: "1px", opacity: "1" }}
            />

            <button
              className="dropdown-item"
              onClick={menuCard}
              style={{
                backgroundColor: "transparent",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Digital Menu Card
            </button>

            <hr
              className="dropdown-divider"
              style={{ color: "#dc3546", height: "1px", opacity: "1" }}
            />

            <button
              className="dropdown-item"
              onClick={signOutBusinessUser}
              style={{
                backgroundColor: "transparent",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {menuCardState ? (
        <MenuCard changeMenuCardState={handleChange} />
      ) : (
        <div
          id="layoutSidenav_content"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <main>
            <div className="container-fluid px-4">
              <h1>Business Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                  Manage Your Business With Epicure
                </li>
              </ol>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "50px",
                  paddingTop: "35px",
                }}
              >
                <div className="col-xl-3 col-md-6">
                  <div
                    className=" text-white mb-4"
                    style={{
                      backgroundColor: "black !important",
                      border: "1px solid #dc3546",
                      boxShadow: "1px 0px 20px 0.5rem rgb(222 67 82 / 60%)",
                    }}
                  >
                    <div className="card-body">Manage Orders</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* <button
                        className="small text-white"
                        onClick={activeOrdersFunction}
                        style={{
                          backgroundColor: "transparent",
                          outline: "0",
                          border: "0",
                        }}
                      >
                        Active Orders!!!
                      </button>
                      <div className="small text-white">
                        <i className="fas fa-angle-right" />
                      </div> */}
                      <Link
                        className="small text-white"
                        to=""
                        onClick={orderRequestsFunction}
                      >
                        Order Requests!!!
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div
                    className="card-body text-white mb-4"
                    style={{
                      backgroundColor: "black !important",
                      border: "1px solid #dc3546",
                      boxShadow: "1px 0px 20px 0.5rem rgb(222 67 82 / 60%)",
                    }}
                  >
                    <div className="card-body">Manage Your Tables Manually</div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div
                    className="text-white mb-4"
                    style={{
                      backgroundColor: "black !important",
                      border: "1px solid #dc3546",
                      boxShadow: "1px 0px 20px 0.5rem rgb(222 67 82 / 60%)",
                    }}
                  >
                    <div className="card-body">Payment Requests</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white"
                        to=""
                        onClick={paymentRequestsFunction}
                      >
                        Payments Requests!!!
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLE STARTS HERE */}
              {showTables(activeOrders, orderRequests, paymentRequests)}
            </div>
          </main>
        </div>
      )}
      <Footer style={{ paddingTop: "40px", color: "white" }} />
    </div>
  );
}

export default BusinessDashboard;
