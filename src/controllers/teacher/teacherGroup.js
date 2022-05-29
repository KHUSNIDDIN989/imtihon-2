const TEACHER_GROUP = (req, res, next) => {
  try {
    // const role = req.data;
    // if (role.role == "admin") {
    //   return res.redirect("/home");
    // }
    // if (role.role == "student") {
    //   return res.redirect("/student");
    // }

    res.render("teacherGroup");
  } catch (err) {
    next(err);
  }
};
const TEACHER_GROUP_FRONT = (req, res, next) => {
  try {
    const { id } = req.data;

    const data = req.select("users");
    const dataGroup = req.select("groups");
    const foundTeacher = data.find((e) => e.id == id);
    const foundGroup = dataGroup.filter((e) => {
      if (e.courses_name.trim() == foundTeacher.teacher_group_name.trim()) {
        e.student = data.find(
          (s) => s.student_group_name?.trim() == e.group_name?.trim()
        );
        e.courses_name.trim() == foundTeacher.teacher_group_name.trim();

        return e;
      }
    });
    console.log(foundGroup);
    res.json(foundGroup);
  } catch (err) {
    next(err);
  }
};

export { TEACHER_GROUP, TEACHER_GROUP_FRONT };
