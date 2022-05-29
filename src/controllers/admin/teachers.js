const GET_TEACHER = (req, res) => {
  try {
    const data = req.select("courses");
    const role = req.data;

    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    const unique = [...new Set(data.map((data) => data.courses_name.trim()))];
    res.render("teachers", { unique });
  } catch (err) {
    console.log(err);
  }
};

const GET_TEACHER_FRONT = (req, res, next) => {
  try {
    const data = req.select("users");

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const POST_TEACHER = (req, res, next) => {
  try {
    const { teacher_name, phone, courses_name } = req.body;
    const data = req.select("users");

    data.push({
      id: data.length ? data[data.length - 1].id + 1 : 1,
      teacher_id: data.length ? data[data.length - 1].teacher_id + 1 : 1,
      username: teacher_name,
      phone,
      teacher_name,
      teacher_phone: phone,
      teacher_group_name: courses_name,
      teacher_date: new Date().toString().split(" ").splice(1, 3).join(" "),
      role: "teacher",
    });

    req.insert("users", data);
    res.redirect("/teachers");
  } catch (err) {
    next(err);
  }
};

const DELETE_TEACHER = (req, res, next) => {
  try {
    const data = req.select("users");
    const { id } = req.params;

    const foundIndex = data.filter((e) => e.teacher_id != id);

    req.insert("users", foundIndex);
    res.redirect("/teachers");
  } catch (err) {
    next(err);
  }
};

export { GET_TEACHER, GET_TEACHER_FRONT, POST_TEACHER, DELETE_TEACHER };
