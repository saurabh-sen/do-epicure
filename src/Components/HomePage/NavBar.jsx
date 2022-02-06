import React, { useState } from "react";
import { Link } from "react-router-dom";
import { child, get, getDatabase, ref } from "@firebase/database";

import "./NavBar.css";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref as reference,
} from "@firebase/storage";

const SearchResultQeries = [];

function NavBar() {
  const [searchResult, setSearchResult] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [imageUri, setImageUri] = useState("");

  const searchResultQueriesFromDatabase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `verified__business__profile/`))
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          SearchResultQeries.push(childSnapshot.val());
        });
      })
      .catch((error) => console.log(error));
  };

  const searchQueryFunction = () => {
    console.log(SearchResultQeries);
    let matchedSearchedResults = SearchResultQeries.filter(
      (result) => result.verified__business__name === `${searchQuery}`
    );
    setSearchResult(matchedSearchedResults);
  };

  const imageUriFunction = (verified__business__key) => {
    const storageRef = reference(
      getStorage(),
      `verified__business__profile__pictures/${verified__business__key}`
    );
    // Find all the prefixes and items.
    var count = 1;
    listAll(storageRef)
      .then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              if (count <= 1) {
                count += 1;
                setImageUri(url);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // RENDER SEARCH RESULTS
  var count = 1;
  const renderSearchResults = () => {
    if (count <= 3) {
      return searchResult.map((results, index) => {
        const {
          verified__business__name,
          verified__business__ratings,
          verified__business__special__item,
          verified__business__address,
          verified__business__description,
          verified__business__email,
          verified__business__contact__number,
          verified__business__key,
        } = results; //destructuring

        count += 1;

        return (
          <Link to={`/cafe/${verified__business__key}`} key={index}>
            <div
              className="search__result"
              id={verified__business__key}
              key={verified__business__key}
            >
              <div
                style={{
                  display: "flex",
                }}
                className="search__result__container__1"
              >
                <div className="search__result__image">
                  {imageUriFunction(verified__business__key)}
                  <img
                    style={{
                      width: "11vw",
                      borderRadius: "7px",
                      height: "16vh !important",
                      marginTop: "8px",
                    }}
                    src={
                      imageUri === ""
                        ? "https://i.etsystatic.com/9684337/r/il/5c0f82/726795730/il_fullxfull.726795730_km9q.jpg"
                        : imageUri
                    }
                    alt="search_result_image"
                  />
                </div>
                <div
                  style={{
                    marginLeft: "1.2vw",
                  }}
                  className="search__result__text"
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "white",
                    }}
                    className="search__result__cafe__name"
                  >
                    {verified__business__name}
                  </p>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "15px",
                    }}
                    className="search__result__cafe__ratings"
                  >
                    {verified__business__ratings} 🌟 Service
                  </p>
                  <p
                    style={{
                      color: "lightslategray",
                      fontSize: "18px",
                      lineHeight: "17px",
                    }}
                    className="search__result__cafe__special_item"
                  >
                    {verified__business__special__item}
                  </p>
                  <p
                    style={{
                      color: "lightslategray",
                      fontSize: "17px",
                      lineHeight: "22px",
                    }}
                    className="search__result__cafe__address"
                  >
                    {verified__business__address}
                  </p>
                  <p
                    style={{
                      color: "lightslategray",
                      fontSize: "18px",
                      lineHeight: "22px",
                    }}
                    className="search__result__cafe__description"
                  >
                    {verified__business__description}
                  </p>
                </div>

                <div
                  style={{
                    marginLeft: "1.2vw",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="search__result__contact__info"
                >
                  <p
                    style={{
                      fontSize: "15px",
                      color: "black",
                    }}
                  >
                    Contact Info..
                  </p>
                  <p
                    style={{
                      color: "lightslategray",
                      fontSize: "18px",
                      lineHeight: "17px",
                    }}
                    className="search__result__cafe__special_item"
                  >
                    {verified__business__email}
                  </p>
                  <p
                    style={{
                      color: "lightslategray",
                      fontSize: "17px",
                      lineHeight: "22px",
                    }}
                    className="search__result__contact__number"
                  >
                    {verified__business__contact__number}
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid" style={{ margin: "0px 20px" }}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          <p className="logo__text">Epicure</p>
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link navbarItems active"
                aria-current="page"
                to="/"
                style={{ color: "white" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbarItems"
                to="/about"
                style={{ color: "white" }}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbarItems"
                to="/contact"
                style={{ color: "white" }}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbarItems"
                to="/feedback"
                style={{ color: "white" }}
              >
                FeedBack's | Rating's
              </Link>
            </li>
          </ul>
          <div className="d-flex me-5">
            <div
              className="search__box"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              style={{ margin: "auto" }}
              onClick={searchResultQueriesFromDatabase}
            >
              <i
                className="fa fa-search m-3 tooltip-test"
                data-placement="top"
                title="Search a Cafe..."
                style={{ margin: "auto", color: "white" }}
              ></i>
            </div>

            {/* POP UP / MODAL STARTS */}
            <div
              className="modal fade bd-example-modal-lg"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
              id="modal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              data-backdrop="false"
            >
              <div
                className="modal-dialog modal-lg"
                role="document"
                style={{
                  boxShadow: "0px 0px 20px 0.1rem rgb(220 53 69)",
                  borderColor: "#dc3545",
                  backgroundColor: "rgb(137 152 170 / 22%)",
                }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Search Some Food Places🤤
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      style={{
                        width: "45px",
                        height: "45px",
                        fontSize: "29px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* SEARCH BAR AND ALL SEARCH RESULTS GOES HERE START */}
                    <div className="search__box">
                      <input
                        className="form-control inputBtn searchBtn m-3"
                        type="search"
                        placeholder="Search a Cafe"
                        aria-label="Search"
                        style={{
                          width: "-webkit-fill-available",
                          backgroundColor: "black",
                          border: "1px solid #87212b",
                          color: "white",
                        }}
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value.toLowerCase())
                        }
                        onKeyUp={searchQueryFunction}
                      />
                    </div>
                    <div
                      style={{
                        padding: "0.5em 1.3em",
                      }}
                      className="search__result__container"
                    >
                      {/* SEARCH RESULTS GOES HERE START */}

                      {renderSearchResults()}

                      {/* SEARCH RESULTS GOES HERE END */}
                    </div>
                    {/* SEARCH BAR AND ALL SEARCH RESULTS GOES HERE END */}
                  </div>
                </div>
              </div>
            </div>
            {/* POP UP / MODAL ENDS */}

            {/* DROPDOWN BUTTON */}

            <div className="dropdown">
              <button
                className="btn btn-outline-danger dropdown-toggle m-3 dropdownBtn"
                id="dropdownMenuLink1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw" />
                SignIn
              </button>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink1"
                style={{
                  backgroundColor: "black",
                  border: "1px solid #9e2632",
                }}
              >
                <Link
                  style={{ color: "white", backgroundColor: "transparent" }}
                  className="dropdown-item"
                  to="/restaurant-register"
                >
                  Register A Business
                </Link>
                <hr className="dropdown-divider" style={{ color: "#ffffff" }} />
                <Link
                  style={{ color: "white", backgroundColor: "transparent" }}
                  className="dropdown-item"
                  to="/restaurant-login"
                >
                  Restaurant's Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
