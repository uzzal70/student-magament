import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "./Context/GloablContext";


const PrivateRoute = ({ children }) => {
	const savedData = localStorage.getItem("user-info");
	let login = JSON.parse(savedData);
	const { isAuthenticated, isLoading } = useContext(GlobalContext);
  
	if (!isLoading) {
	  if (login?.status === "success") {
		return children;
	  } else {
		return <Navigate to="/login" />;
	  }
	} else {
	  // Add a loading state if necessary
	  return <div>Loading...</div>;
	}
  };
  
  export default PrivateRoute;
