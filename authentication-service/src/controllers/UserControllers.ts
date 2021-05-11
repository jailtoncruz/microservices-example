import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { Status } from "../classes/User";
import { uuidv4 } from '../services/utils';
require("dotenv").config();

const secret = String(process.env.SECRET);

function generateToken(params = {}) {
  const token = {
    token: jwt.sign(params, secret, {
      expiresIn: 86400,
    }),
    expiresIn: 86400,
  };
  return token;
}

class UserController {
  async index(req: Request, res: Response) {
    return res.status(400).json({ Error: "method not implemented" })
    /*
    const users = await knex.select<IUser[]>().table("users").limit(10);
    const nUsers = users.map((item) => {
      delete item.password;
      return item;
    });
    res.json(nUsers);
    */
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    return res.status(400).json({ Error: "method not implemented", args: { id } })
    /*
    const user = await knex.select().table("users").where("id", id).first();

    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ error: "User not found" });
    }
    */
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const hash = await Bcrypt.hash(password, 8);

    const user = new User().newUser(name, email, hash, Status.active);
    user.uuid = uuidv4();
    user.password = undefined;

    res.json({ ...user, token: generateToken({ id: user.uuid }) });
  }

  async destroy(req: Request, res: Response) {
    return res.status(400).json({ Error: "method not implemented" })
    //const { id } = req.params;
    //res.status(200).json({ status: `User was destroyed: ${user.name}` });
  }

  async authenticate(req: Request, res: Response) {
    return res.status(400).json({ Error: "method not implemented" })
    /*
    const { email, password } = req.body;
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!(await Bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid password" });

    user.password = undefined;

    res.json({ ...user, access: generateToken({ id: user.id }) });
    */
  }

  async me(req: any, res: Response) {
    return res.status(400).json({ Error: "method not implemented" });
    /*
    const userId = req.userId;
    const user = await knex.select().table("users").where("id", userId).first();
    user.image = `${apiURL}/avatar/users/${user.image}`;
    user.password = undefined;

    return res.json(user);
    */
  }
}

export default UserController;
