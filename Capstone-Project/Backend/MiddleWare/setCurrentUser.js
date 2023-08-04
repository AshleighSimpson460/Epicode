import jwt_decode from "jwt-decode";

const setCurrentUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt_decode(token);
    req.currentUser = { id: payload.id, name: payload.name };
  }
  next();
};

export default setCurrentUser;
