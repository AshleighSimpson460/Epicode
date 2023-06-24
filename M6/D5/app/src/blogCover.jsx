import { useState } from "react";

export const CoverUploader = () => {
  const [formData, setFormData] = useState(new FormData());

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(
      "http://localhost:3002/blogPosts/blog/645ca58de54bb3bf0e1cdb75/cover",
      {
        method: "PATCH",
        body: formData,
      }
    );
  };

  const handleFile = (event) => {
    setFormData((prev) => {
      prev.delete("cover");
      prev.append("cover", event.target.files[0]);
      return prev;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="cover" onChange={handleFile} />
        <input type="submit" value="Upload Cover" />
      </form>
    </div>
  );
};
