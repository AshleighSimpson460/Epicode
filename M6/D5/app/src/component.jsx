import { useState } from "react";

export const Link = () => {
  const [formData, setFormData] = useState(new FormData());

  const handleSubmit = async (event) => {
    event.preventDefault();
     await fetch(
      "http://localhost:3002/blogPosts/blog/645ca58de54bb3bf0e1cdb75/comments",
      {
        method: "POST",
        body: formData,
      }
    );
  };
  const handleFile = (event) => {
    setFormData((prev) => {
      prev.delete("avatar");
      prev.append("avatar", event.target.files[0]);
      return prev;
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="avatar" onChange={handleFile}></input>
        <input type="submit" value="Upload Avatar"></input>
      </form>
      ;
    </div>
  );
};
