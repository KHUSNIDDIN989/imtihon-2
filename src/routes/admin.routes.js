import { Router } from "express";
import {
  DELETE_COURSES,
  GET_COURSES,
  GET_COURSES_FRONT,
  POST_COURSES,
} from "../controllers/admin/courses.js";
import {
  DELETE_GROUPS,
  GET_GROUPS,
  GET_GROUPS_FRONT,
  GET_GROUPS_FRONT_teacher,
  POST_GROUPS,
} from "../controllers/admin/groups.js";
import {
  GET_STUDENTS,
  GET_STUDENTS_FRONT,
  POST_STUDENT,
  DELETE_STUDENT,
} from "../controllers/admin/students.js";
import {
  DELETE_TEACHER,
  GET_TEACHER,
  GET_TEACHER_FRONT,
  POST_TEACHER,
} from "../controllers/admin/teachers.js";
import { GET_HOME } from "../controllers/admin/home.js";
import VERIFY_TOKEN from "../middlewares/verfyToken.js";
import teacherMiddlewars from "../middlewares/teacherMiddlewar.js";

export default Router()
  .get("/home", VERIFY_TOKEN, GET_HOME)
  .get("/courses", VERIFY_TOKEN, GET_COURSES)
  .get("/students", VERIFY_TOKEN, GET_STUDENTS)
  .get("/studentfront", GET_STUDENTS_FRONT)
  .get("/coursesfront", GET_COURSES_FRONT)
  .get("/groups", VERIFY_TOKEN, GET_GROUPS)
  .get("/groupsfront", GET_GROUPS_FRONT)
  .get("/groups_teacher", GET_GROUPS_FRONT_teacher)
  .get("/teachers", VERIFY_TOKEN, GET_TEACHER)
  .get("/teachersfront", GET_TEACHER_FRONT)
  .post("/student", POST_STUDENT)
  .post("/courses", POST_COURSES)
  .post("/teachers", teacherMiddlewars, POST_TEACHER)
  .post("/groups", POST_GROUPS)
  .delete("/student/:id", DELETE_STUDENT)
  .delete("/courses/:id", DELETE_COURSES)
  .delete("/teachers/:id", DELETE_TEACHER)
  .delete("/groups/:id", DELETE_GROUPS);
