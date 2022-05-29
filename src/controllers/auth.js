import { sign } from "../utils/jwt.js";

const GET_AUTH = (req, res, next) => {
  try {
    res.render("index");
  } catch (err) {
    next(err);
  }
};

const POST_AUTH = (req, res, next) => {
  try {
    const { name, phone } = req.body;
    let data = req.select("users");
    let group = req.select("groups");

    group = group.find((e) => e.username == name && e.phone == phone);
    data = data?.find((e) => e.username == name && e.phone == phone);
    // data = data?.find((e) => e.username == name && e.phone == phone);
    if (data.role == "admin") {
      res.cookie("token", sign({ id: data.id, role: data.role }));
      res.redirect("/home");
      return;
    }

    if (data.role == "teacher") {
      res.cookie("token", sign({ id: data.id, role: data.role }));
      res.redirect("/teacher");
      return;
    }

    if (data.role == "student") {
      res.cookie("token", sign({ id: data.id, role: data.role }));
      res.redirect("/student");
      return;
    }
    res.send("ok");
  } catch (err) {
    next(err);
  }
};

export { GET_AUTH, POST_AUTH };
