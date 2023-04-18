import "./App.css";
import MyBadge from "./myBadge";
import BookList from "./Booklist";
import { useState } from "react";
import Singlebook from "./singlebook";
import FetchAPI from "./FetchAPI";
import MyNav from "./NavBar";
import { Container, Col, Row } from "react-bootstrap";
import Form from "./Form";

function App() {
  const [data, setData] = useState("");
  function getData(inputValue) {
    setData(inputValue);
  }
  return (
    <div>
      <MyNav stateElevation={getData} />
      <MyBadge />
      <Singlebook />
      <BookList input={data} />
      <FetchAPI/>
      {/* <Form/> */}
    </div>
  );
}

export default App;
