const teacherMiddlewars = (req, res, next) => {
  try {
    const { teacher_name, phone } = req.body;

    let test = new RegExp(/^\+998[3-9][0-9][0-9]{3}[0-9]{2}[0-9]{2}/g);
    if (!test.test(phone)) {
      return res.redirect("/teachers");
    }

    if ((teacher_name && phone).length == 0) {
      return res.redirect("/teachers");
    }
  } catch (err) {
    next(err);
  }
  next();
};

export default teacherMiddlewars;
