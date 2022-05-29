import { Router } from "express";

import {
  GET_TEACHERS,
  GET_TEACHERS_FRONT,
} from "../controllers/teacher/teacher.js";
import VERIFY_TOKEN from "../middlewares/verfyToken.js";
import {
  TEACHER_GROUP,
  TEACHER_GROUP_FRONT,
} from "../controllers/teacher/teacherGroup.js";

export default Router()
  .get("/teacher", VERIFY_TOKEN, GET_TEACHERS)
  .get("/getfront", GET_TEACHERS_FRONT)
  .get("/teachergroup", VERIFY_TOKEN, TEACHER_GROUP)
  .get("/teacherfront", TEACHER_GROUP_FRONT);
