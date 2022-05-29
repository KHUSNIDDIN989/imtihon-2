const GET_HOME = (req, res, next) => {
  try {
    const role = req.data;
    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    res.render("home");
  } catch (err) {
    next(err);
  }
};

export { GET_HOME };
