import { Request, Response } from "express";
import UserDao from "./users.dao";
import User from "./users.entity";

const userDao = new UserDao();

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userDao.getAll();
    return res.json({ users });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const user = await userDao.getOne(id);
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { phone, email } = req.body;
    const newUser = new User(email, phone);
    const id = await userDao.add(newUser);
    return res.status(201).json({ id });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { phone, email, id } = req.body;
    const user = new User(email, phone, id);
    const updatedUser = await userDao.update(user);
    return res.json({ user: updatedUser });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    await userDao.delete(id);
    return res.end();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

const UserController = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default UserController;
