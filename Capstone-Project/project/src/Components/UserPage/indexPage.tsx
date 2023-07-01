import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("C_Token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/home");
    }
    //eslint-disable-next-line
  }, []);
  return <div>Index</div>;
};

export default IndexPage;
