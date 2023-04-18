import { Form as BootstrapForm, Button } from "react-bootstrap";
import React,{useState, useEffect} from "react";

const CommentForm = ({ preventSubmit }) => {
  const [comment, setComment] = useState("");

  useEffect([]);

  return (
    <>
      <BootstrapForm onSubmit={(e) => preventSubmit(e,comment)}>
        <BootstrapForm.Group>
          <BootstrapForm.Control
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add Comment.."
          />
        </BootstrapForm.Group>
        <Button variant="primary" type="submit">
          Submit Comment
        </Button>
      </BootstrapForm>
    </>
  );
};

export default CommentForm;
