import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Horrormovie from "./horror.json";

function DataJSON() {
  return (
    <div className="Latestreleases m-3 text-center">
      <strong>
        <h1>Latest Releases</h1>
      </strong>
      <div className="container-fluid">
        <Container>
          <Row>
            {Horrormovie.map((horror) => {
              return (
                <Col md={4} xs={4} lg={2} key={horror.asin}>
                  <div className="HorrorCard m-3">
                    <Card style={{ width: "10rem" }}>
                      <Card.Img variant="top" src={horror.img} />
                      <Card.Body>
                        <Card.Title>{horror.title}</Card.Title>
                        <Card.Text>
                          <span>Genre:</span>
                          <strong>{horror.category.toUpperCase()}</strong>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default DataJSON;
