import path from "path";
import fs from "fs";

const model = (req, res, next) => {
  req.select = (dir) => {
    let files = fs.readFileSync(
      path.join(process.cwd(), "src", "database", dir + ".json"),
      { encoding: "utf-8" }
    );
    files = files ? JSON.parse(files) : [];
    return files;
  };

  req.insert = (dir, data) => {
    fs.writeFileSync(
      path.join(process.cwd(), "src", `./database/${dir}` + ".json"),
      JSON.stringify(data, null, 4)
    );
    return true;
  };

  return next();
};

export default model;
