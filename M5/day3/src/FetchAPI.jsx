import React, { useEffect, useState } from "react";
import APIURL from "./APILink";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Form from "./Form";

const FetchAPI = () => {
  const [commentData, setComment] = useState([]);
  const apiGet = () => {
    fetch(APIURL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFhMTBmZmU3ZGE1MzAwMTNiNjZhZGUiLCJpYXQiOjE2ODE1MDY4MDIsImV4cCI6MTY4MjcxNjQwMn0.Uvj2kj0d4GWShVQMo1TrkoK2UeGEywgN6S1Vms4f7as",
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setComment(body);
      });
  };
  useEffect(apiGet, []);
  return (
    <div>
      <ul>
        {commentData.map((comment) => (
          <>
            <li>{comment.comment}</li>
            <li >{comment.rate}</li>
            <li >{comment.author}</li>
          </>
        ))};
      </ul>
    </div>
  );
};

export default FetchAPI;
