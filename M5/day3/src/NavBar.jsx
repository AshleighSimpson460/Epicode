import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNav = (props) => {
    return (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Book Collection</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                    className="Searchbar"
                    onChange={e => props.stateElevation(e.target.value)}
                    type="text"
                    placeholder="Search Books Here..."
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
};

export default MyNav;