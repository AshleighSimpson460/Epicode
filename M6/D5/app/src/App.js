import React from "react";
import { Link } from "./component";
import { CoverUploader } from "./blogCover";

function App() {
  return (
    <form
      action="http://localhost:3002/blogPosts/authors/645ca58de54bb3bf0e1cdb75/avatar"
      method="patch"
      encType="multipart/form-data"
    >
      <CoverUploader />
      <hr />
      <Link />
    </form>
  );
}

export default App;
