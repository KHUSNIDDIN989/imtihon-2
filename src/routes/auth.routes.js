import { Router } from "express";
import { GET_AUTH, POST_AUTH } from "../controllers/auth.js";

export default Router().get("/auth", GET_AUTH).post("/auth", POST_AUTH);
