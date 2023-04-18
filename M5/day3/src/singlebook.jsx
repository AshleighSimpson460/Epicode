import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchAPI from "./FetchAPI";
import { useState } from "react";

const Singlebook = (props) => {
const [style, setStyle] = useState(false);
  return (
    <>
        <Col lg={3} md={3} className="mb-3">
          <Card style={{ width: "15rem" , border: style ? "2px solid red" : ""}} onClick={() => setStyle(true)}>
            <Card.Img variant="top" src={props.book?.img} />
            <Card.Body>
              <Card.Title>{props.book?.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
    </>
  );
};

export default Singlebook;
