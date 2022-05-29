import jwt from "jsonwebtoken";

const VERIFY_TOKEN = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect("/auth");
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).redirect("/auth");
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).redirect("/auth");
    }

    // if (decode.role == "teacher") {
    //   return res.redirect("/teacher");
    // }

    // if (decode.role == "student") {
    //   return res.redirect("student");
    // }

    req.data = decode;
  });

  next();
};

export default VERIFY_TOKEN;
