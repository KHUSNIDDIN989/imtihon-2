const TEACHER_GROUP = (req, res, next) => {
  try {
    const role = req.data;
    if (role.role == "admin") {
      return res.redirect("/home");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    const data = req.select("groups").map((e) => e.group_name);

    res.render("teacherGroup", { data });
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
      if (e.courses_name?.trim() == foundTeacher.teacher_group_name?.trim()) {
        e.student = data.find(
          (s) => s.student_group_name?.trim() == e.group_name?.trim()
        );
        e.courses_name?.trim() == foundTeacher.teacher_group_name?.trim();

        return e;
      }
    });
    res.json(foundGroup);
  } catch (err) {
    next(err);
  }
};

const POST_GROUP = (req, res, next) => {
  try {
    const { topic, textarea, group } = req.body;
    const data = req.select("topic");

    data.push({
      id: data.length + 1,
      topic,
      textarea,
      group,
    });

    req.insert("topic", data);
    res.redirect("/teachergroup");
  } catch (err) {
    next(err);
  }
};
export { TEACHER_GROUP, TEACHER_GROUP_FRONT, POST_GROUP };
