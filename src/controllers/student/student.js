const GET_STUDENT = (req, res, next) => {
  try {
    const role = req.data;
    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "admin") {
      return res.redirect("/home");
    }
    res.render("student");
  } catch (err) {
    next(err);
  }
};
const GET_STUDENT_FRONT = (req, res, next) => {
  try {
    res.render("student");
  } catch (err) {
    next(err);
  }
};
export { GET_STUDENT };
