import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const secret = String(process.env.SECRET);

export default function (req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No Token provided" });

  const parts = authHeader.split(" ");

  if (!(parts.length === 2))
    return res.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: "Token malformatted" });

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  });
}
