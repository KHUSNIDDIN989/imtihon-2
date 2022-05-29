const GET_GROUPS = (req, res, next) => {
  try {
    const unique = req.select("users");
    const groupName = req.select("groups");
    const data = [...new Set(unique.map((data) => data.teacher_name?.trim()))];
    const group = [...new Set(groupName.map((data) => data.group_name.trim()))];
    const role = req.data;
    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }
    res.render("groups", { data: data, group: group });
  } catch (err) {
    next(err);
  }
};

const GET_GROUPS_FRONT = (req, res, next) => {
  try {
    const data = req.select("groups");

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const GET_GROUPS_FRONT_teacher = (req, res, next) => {
  try {
    const data = req.select("users").filter((e) => e.role == "teacher");
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const POST_GROUPS = (req, res, next) => {
  try {
    const { group_name, class_days, class_time, teacher_name, courses_name } =
      req.body;
    const data = req.select("groups");

    if (data.find((e) => e.group_name == group_name)) {
      return res.redirect("groups");
    }

    data.push({
      id: data.length ? data[data.length - 1].id + 1 : 1,
      group_id: data.length ? data[data.length - 1].id + 1 : 1,
      group_name,
      class_days,
      class_time,
      student_count: 1,
      teacher_name,
      courses_name,
      group_date: new Date().toString().split(" ").splice(1, 3).join(" "),
    });

    req.insert("groups", data);

    res.redirect("/groups");
  } catch (err) {
    next(err);
  }
};

const DELETE_GROUPS = (req, res, next) => {
  try {
    const data = req.select("groups");
    const { id } = req.params;
    const foundIdex = data?.filter((e) => e.group_id != id);

    req.insert("groups", foundIdex);
    res.redirect("/groups");
  } catch (err) {
    next(err);
  }
};
export {
  GET_GROUPS,
  GET_GROUPS_FRONT,
  GET_GROUPS_FRONT_teacher,
  POST_GROUPS,
  DELETE_GROUPS,
};
