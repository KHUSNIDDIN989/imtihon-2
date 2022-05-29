import "dotenv/config";
import express from "express";
import path from "path";
import { cwd } from "process";
import cookie from "cookie-parser";
// PORT IMPORTED
import { PORT } from "../config.js";
import model from "./middlewares/model.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teachersRoutes from "./routes/teachers.routes.js";
import studentRoutes from "./routes/student.routes.js";
import VERIFY_TOKEN from "./middlewares/verfyToken.js";
// express
const app = express();
app.use(express.json());
app.use(model);

// settings
app.use(cookie());
app.use(express.static(path.join(cwd(), "src/public")));
app.set("view engine", "ejs");
app.set("views", cwd() + "/src/views/");
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", VERIFY_TOKEN);
app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/", teachersRoutes);
app.use("/", studentRoutes);

// else page not found
app.use("/", (_, res) => res.status(404).json("page not found"));

app.use((err, req, res, next) => {
  console.log(err);
});
// PORT RUNENG
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
