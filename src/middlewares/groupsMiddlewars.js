// const groupsMiddlewars = (req, res, next) => {
//   try {
//     const { direction, class_days, class_time, teacher_name, teacher_phone } =
//       req.body;

//     let test = new RegExp(/^\+998[3-9][0-9][0-9]{3}[0-9]{2}[0-9]{2}/g);

//     if (!test.test(teacher_phone)) {
//       return res.redirect("/groups");
//     }

//     if (
//       (direction && class_days && class_time && teacher_name && teacher_phone)
//         .length == 0
//     ) {
//       return res.redirect("/groups");
//     }
//   } catch (err) {
//     next(err);
//   }
//   next();
// };

// export default groupsMiddlewars;
