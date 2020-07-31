import { Request, Response } from "express";
import UserDao from "./users.dao";
import User from "./users.entity";

const userDao = new UserDao();

export const getAll = async (req: Request, res: Response) => {
  const users = await userDao.getAll();
  return res.json({ users });
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const user = await userDao.getOne(id);
  return res.json({ user });
};

export const create = async (req: Request, res: Response) => {
  const { login, phone, email } = req.body;
  const newUser = new User(login, phone, email);
  const id = await userDao.add(newUser);
  return res.json({ id });
};

export const update = async (req: Request, res: Response) => {
  const { login, phone, email, id } = req.body;
  const user = new User(id, login, phone, email);
  const updatedUser = await userDao.add(user);
  return res.json({ user: updatedUser });
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params["id"];
  await userDao.delete(id);
  return res.end();
};

const UserController = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default UserController;
