import React, { useEffect, useState } from "react";
import APIURL from "./APILink";
const Comments = (props) => {
  const [commentData, setComment] = useState([]);
  const apiGet = () => {
    fetch(APIURL + props.id, {
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
          <div key={comment._id}>
            <li>{comment.comment}</li>
            <li>{comment.rate}</li>
            <li>{comment.author}</li>
          </div>
        ))}
        ;
      </ul>
    </div>
  );
};

export default Comments;
