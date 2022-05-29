import { Router } from "express";
import { GET_STUDENT } from "../controllers/student/student.js";
import VERIFY_TOKEN from "../middlewares/verfyToken.js";

export default Router().get("/student", VERIFY_TOKEN, GET_STUDENT);
