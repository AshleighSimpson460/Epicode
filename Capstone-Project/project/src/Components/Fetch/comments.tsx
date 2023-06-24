import { useEffect, useState } from "react";
import React from "react";

const commentURL = "https://jsonplaceholder.typicode.com/comments";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
  const [commentData, setComment] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(commentURL)
      .then((res) => res.json())
      .then((comment) => {
        const first100 = comment.slice(0, 100);
        setComment(first100);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {isLoading && <div className="spinner-border"></div>}
          <ul className="list-group m-2">
            {commentData.map((comment: Comment) => (
              <div className="my-1" key={comment.id}>
                <li className="list-group-item">{comment.name}</li>
                <li className="list-group-item">{comment.email}</li>
                <li className="list-group-item">{comment.body}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comments;
