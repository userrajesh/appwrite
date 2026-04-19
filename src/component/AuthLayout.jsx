import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);
  if (loading) {
    return "Loading...";
  } else {
    return <> {children}</>;
  }
  // shortcut for if  else ie ternary operator
  //return loading ? <h1>Loading...</h1> : <>{children}</>;
}
