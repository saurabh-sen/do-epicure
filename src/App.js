import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BusinessRegister from "./Components/LoginAndRegisterComponents/BusinessRegister.jsx";
import BusinessLogin from "./Components/LoginAndRegisterComponents/BusinessLogin.jsx";
import DinerRegister from "./Components/LoginAndRegisterComponents/DinerRegister.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import Feedback from "./Components/HomePage/Feedback.jsx";
import DinerLogin from "./Components/LoginAndRegisterComponents/DinerLogin.jsx";
import About from "./Components/NavbarComponents/About.jsx";
import Contact from "./Components/NavbarComponents/Contact.jsx";
import TermsAndServices from "./Components/HomePage/TermsAndServices.jsx";
import PageNotFound from "./Components/PageNotFound/PageNotFound.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import BusinessDashboard from "./Components/BusinessDashboard/BusinessDashboard";
import EditProfile from "./Components/BusinessDashboard/BusinessDashboardComponents/EditProfile";
import AddMenuItem from "./Components/BusinessDashboard/BusinessDashboardComponents/AddMenuItem";
import CafeLandingPage from "./Components/CafeLandingPage/CafeLandingPage";
import DinerMenuCard from "./Components/DinerOrdering/DinerMenuCard.jsx";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <Router>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cafe/:cafe__id" element={<CafeLandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/diner-login" element={<DinerLogin />} />
            <Route path="/diner-register" element={<DinerRegister />} />
            <Route path="/menucard:table__number" element={<DinerMenuCard />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/termsandservices" element={<TermsAndServices />} />
            <Route path="/restaurant-register" element={<BusinessRegister />} />
            <Route path="/restaurant-login" element={<BusinessLogin />} />
            <Route path="/businessdashboard" element={<BusinessDashboard />} />
            <Route path="/editbusinessprofile" element={<EditProfile />} />
            <Route path="/addnewmenuitem" element={<AddMenuItem />} />
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default App;
