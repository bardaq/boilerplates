import { IUser } from "./users.interfaces";

class User implements IUser {

    public id: string;
    public login: string;
    public phone: string;
    public email?: string;

    constructor(
      loginOrUser: string | IUser,
      phone?: string,
      email?: string,
      id?: string
    ) {
      if (typeof loginOrUser === "string") {
        this.login = loginOrUser;
        this.email = email;
        this.phone = phone || "";
        this.id = id || String(-1);
      } else {
        const user = loginOrUser;
        this.login = user.login;
        this.email = user.email;
        this.phone = user.phone;
        this.id = user.id;
      }
    }
}

export default User;
