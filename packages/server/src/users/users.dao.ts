import { IUser } from "./users.interfaces";
import mock from "./user.mock";

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<string>;
  update: (user: IUser) => Promise<IUser>;
  delete: (id: string) => Promise<void>;
}

class UserDao implements IUserDao {
  public async getOne(id: string): Promise<IUser | null> {
    return mock.find((user) => user.id === id) || null;
  }

  public async getAll(): Promise<IUser[]> {
    return mock as IUser[] | [];
  }

  public async add(user: IUser): Promise<string> {
    user;
    // TODO: add in DB and return an ID of the new obj
    return "1234123412341223";
  }

  public async update(user: IUser): Promise<IUser> {
    user;
    // TODO: update in DB and return the updated obj
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(id: string): Promise<void> {
    return undefined;
  }
}

export default UserDao;
