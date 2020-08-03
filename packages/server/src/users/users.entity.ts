import { IUser } from "./users.interfaces";

class User implements IUser {
  public id: string;
  public phone: string;
  public email: string;

  constructor(emailOrUser: string | IUser, phone?: string, id?: string) {
    // if (emailOrUser instanceof User) {
    if (typeof emailOrUser === "string") {
      this.email = emailOrUser as string;
      this.phone = phone || "";
      this.id = id || String(-1);
    } else {
      const user = emailOrUser;
      this.email = user.email;
      this.phone = user.phone;
      this.id = user.id;
    }
  }
}

export default User;
