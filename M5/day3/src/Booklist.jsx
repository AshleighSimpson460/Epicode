import Singlebook from "./singlebook";
import books from "./fantasy.json";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookList = (props) => {
  return (
    <Container>
      <Row> 
        {books
          .filter((book) => {
            return book.title.toLowerCase().includes(props.input.toLowerCase());
          })
          .map((book) => (
            <Singlebook key={book.asin} book={book} />
          ))}
        ;
      </Row>
    </Container>
  );
};

export default BookList;
