import React, { useState, useEffect } from "react";

const usersURL = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  username: string;
}

const Users = () => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(usersURL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {isLoading ? (
            <div className="spinner-border"></div>
          ) : (
            <ul className="list-group m-2">
              {users.map((user: User) => (
                <div className="my-1" key={user.id}>
                  <li className="list-group-item">{user.name}</li>
                  <li className="list-group-item">{user.username}</li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
