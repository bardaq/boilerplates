import { IUser } from "./users.interfaces";
import db from "@/loaders/db";

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<string>;
  update: (user: IUser) => Promise<IUser>;
  delete: (id: string) => Promise<void>;
}

class UserDao implements IUserDao {
  public async getOne(id: string) {
    const q = "SELECT * FROM users WHERE id = $1";
    const values = [id];
    const { rows } = await db.query(q, values);
    if (rows.length === 0) return null;
    return rows[0];
  }

  public async getAll() {
    const { rows } = await db.query("SELECT * FROM users");
    return rows;
  }

  public async add(user: IUser) {
    const q = "INSERT INTO users (phone, email) VALUES ($1, $2) RETURNING *";
    const values = [user.phone, user.email];
    const { rows } = await db.query(q, values);
    return rows[0].id;
  }

  public async update(user: IUser) {
    const q =
      "UPDATE users SET phone = $1, email = $2 WHERE id = $3 RETURNING *";
    const values = [user.phone, user.email, user.id];
    const { rows } = await db.query(q, values);
    return rows[0];
  }

  public async delete(id: string) {
    const q = "DELETE FROM users WHERE id = $1";
    const values = [id];
    await db.query(q, values);
  }
}

export default UserDao;
