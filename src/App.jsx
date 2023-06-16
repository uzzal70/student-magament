import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";
import GlobalContext from "./components/Context/GloablContext";
import Header from "./components/Header/Header";

const App = () => {
  AOS.init();
  const location = useLocation();
  const { openNav, setOpenNav, setIsAuthenticated, breakpoint } =
    useContext(GlobalContext);
  let [loginData, setLoginData] = useState();
  const savedData = localStorage.getItem("user-info");
  let login = JSON.parse(savedData);
  useEffect(() => {
	
    let isLocalAuthenticated = localStorage.getItem("isAuthenticated");
    setLoginData(login);
    if (login?.email) setIsAuthenticated(JSON.parse(login));
    else setIsAuthenticated(true);
  }, []);
  return (
    <div>
      {login?.status === "success" ? (
        <div>
          <Navigation />
          <Header />
          <main
            className="main"
            style={{
              left: breakpoint("mobile")
                ? 0
                : openNav
                ? "var(--side-width)"
                : "7.5rem",
              width: breakpoint("mobile")
                ? "100vw"
                : openNav
                ? "calc(100vw - var(--side-width))"
                : "calc(100vw - 7.5rem)",
            }}
          >
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
      {/* {location.pathname !== "/" &&
			location.pathname !== "/login" &&
			location.pathname !== "/register" ? (
				<>
					<Navigation />
					<Header />
					<main
						className="main"
						style={{
							left: breakpoint("mobile")
								? 0
								: openNav
								? "var(--side-width)"
								: "7.5rem",
							width: breakpoint("mobile")
								? "100vw"
								: openNav
								? "calc(100vw - var(--side-width))"
								: "calc(100vw - 7.5rem)",
						}}
					>
						<Routes>
							<Route
								path="/dashboard"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
						</Routes>
					</main>
				</>
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			)} */}
    </div>
  );
};

export default App;
