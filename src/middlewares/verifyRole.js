import { verify } from "../utils/jwt.js";
const verifyRole = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verify(token, (err, decode) => {
      if (!err) {
        if (decode.role == "admin") {
          return res.redirect("/home");
        }
        if (decode.role == "/teacher") {
          return res.redirect("/teacher");
        }
        if (decode.role == "student") {
          return res.redirect("/student");
        }
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

export default verifyRole;
