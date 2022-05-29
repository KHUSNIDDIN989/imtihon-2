const GET_COURSES = (req, res, next) => {
  try {
    const role = req.data;
    if (role.role == "teacher") {
      return res.redirect("/teacher");
    }
    if (role.role == "student") {
      return res.redirect("/student");
    }

    const data = req.select("courses");
    const unique = [...new Set(data.map((data) => data.courses_name.trim()))];
    res.render("courses", { unique });
  } catch (err) {
    next(err);
  }
};

const GET_COURSES_FRONT = (req, res, next) => {
  try {
    const data = req.select("courses");

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const POST_COURSES = (req, res, next) => {
  try {
    const { direction, price } = req.body;
    const data = req.select("courses");

    data.push({
      id: data.length ? data[data.length - 1].id + 1 : 1,
      courses_id: data.length ? data[data.length - 1].id + 1 : 1,
      courses_name: direction?.toUpperCase(),
      courses_price: price,
      courses_date: new Date().toString().split(" ").splice(1, 3).join(" "),
    });

    req.insert("courses", data);
    res.redirect("/courses");
  } catch (err) {
    next(err);
  }
};

const DELETE_COURSES = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.select("courses");
    const foundIndex = data.filter((e) => e.courses_id != id);

    req.insert("courses", foundIndex);
    res.json("ok");
  } catch (err) {
    next(err);
  }
};
export { GET_COURSES, GET_COURSES_FRONT, POST_COURSES, DELETE_COURSES };
