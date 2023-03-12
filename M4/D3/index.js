import { createClient } from "pexels";

const client = createClient(
  "NcWMeuvW3dNTURPtcbq7poq2RNdOlK8FZdAEG34o9xFcRD3iGh36y2Yu"
);

// All requests made with the client will be authenticated

const fetchAPI = () => {
  fetch("")
    .then((res) => res.json())
    .then((data) => console.log()).catch(e) => console.log(e);
};
