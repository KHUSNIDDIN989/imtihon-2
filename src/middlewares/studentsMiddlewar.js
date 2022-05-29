// import { read } from "../utils/fs.js";

// const studentMiddlewar = (req, res, next) => {
//   const { first_name, phone, direction, class_days, class_time } = req.body;
//   const data = read("students");

//   let test = new RegExp(/^\+998[3-9][0-9][0-9]{3}[0-9]{2}[0-9]{2}/g);

// //   if (!test.test(phone)) {
//     return res.redirect("/students");
//   }
//   if (
//     (first_name && phone && direction && class_days && class_time).length == 0
//   ) {
//     return res.redirect("/students");
//   }

//   const foundUser = data?.filter((e) => {
//     return e.student_phone == phone && e.direction == direction;
//   });
//   if (!foundUser.length == 0) {
//     return res.redirect("/students");
//   }

//   next();
// };
// export default studentMiddlewar;
