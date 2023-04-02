import { Button } from "reactstrap";

const Jumbo = () => {
  return (
    <>
      <div class="container py-5">
        <h1 class="display-5 fw-bold">Welcome To The Book Store</h1>
        <p class="col-md-8 fs-4">Using a series of utilities, I ended up creating my own jumbotron as of react-bootstrap v5 Jumbotron no longer exists and so I decided to use
        some bootstrap classes to make it resemble a Jumbotron.
        </p>
        <Button class="btn btn-primary btn-lg" type="button">Learn More..</Button>
      </div>
    </>
  );
};

export default Jumbo;
