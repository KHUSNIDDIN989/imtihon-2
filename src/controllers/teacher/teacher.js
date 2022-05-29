const GET_TEACHERS = (req, res, next) => {
  try {
    const role = req.data;
    if (role.role == "admin") {
      return res.redirect("/home");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    const dataStudent = req.select("users").filter((e) => e.role == "student");

    const uniqueData = [
      ...new Set(dataStudent?.map((data) => data.student_group_name.trim())),
    ];

    res.render("teacher", { uniqueData });
  } catch (err) {
    next(err);
  }
};

const GET_TEACHERS_FRONT = (req, res, next) => {
  try {
    const { id } = req.data;
    const data = req.select("users").filter((e) => e.id == id);

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const POST_TEACHER = (req, res, next) => {
  try {
    console.log();
  } catch (err) {
    next(err);
  }
};

export { GET_TEACHERS, GET_TEACHERS_FRONT };
