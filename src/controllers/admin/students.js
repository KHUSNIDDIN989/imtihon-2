const GET_STUDENTS = (req, res, next) => {
  try {
    const role = req.data;

    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    const data = req.select("groups");
    const dataStudent = req.select("users").filter((e) => e.role == "student");

    const unique = [...new Set(data.map((data) => data.group_name?.trim()))];
    const uniqueData = [
      ...new Set(dataStudent?.map((data) => data.student_group_name.trim())),
    ];

    res.render("students", { unique, uniqueData });
  } catch (err) {
    next(err);
  }
};

const GET_STUDENTS_FRONT = (req, res, next) => {
  try {
    const data = req.select("users");

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const POST_STUDENT = (req, res, next) => {
  try {
    const { student_name, phone, group_name } = req.body;
    const data = req.select("users");
    const dataGroup = req
      .select("groups")
      .find((e) => e.group_name == student_name);

    console.log(dataGroup);

    const foundStudent = data.find(
      (e) =>
        e.student_name == student_name && e.student_group_name == group_name
    );

    if (foundStudent) {
      return res.redirect("students");
    }

    data.push({
      id: data.length ? data[data.length - 1].id + 1 : 1,
      student_id: data.length ? data[data.length - 1].student_id + 1 : 1,
      username: student_name,
      phone,
      student_name,
      student_phone: phone,
      student_group_name: group_name,
      // student_cours: foundGroup.courses_name,
      student_date: new Date().toString().split(" ").splice(1, 3).join(" "),
      role: "student",
    });

    req.insert("users", data);

    res.redirect("students");
  } catch (err) {
    next(err);
  }
};

const DELETE_STUDENT = (req, res, next) => {
  try {
    const data = req.select("users");
    const { id } = req.params;

    const founUsers = data.filter((e) => e.student_id != id);

    req.insert("users", founUsers);

    res.redirect("students");
  } catch (err) {
    next(err);
  }
};
export { GET_STUDENTS, GET_STUDENTS_FRONT, POST_STUDENT, DELETE_STUDENT };
