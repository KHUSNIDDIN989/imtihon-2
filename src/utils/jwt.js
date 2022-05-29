import jwt from "jsonwebtoken";

import { TOKEN_TIME } from "../../config.js";

const sign = (payload) =>
  jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: TOKEN_TIME });

const verify = (token) => jwt.verify(token, process.env.TOKEN_KEY);

export { sign, verify };
