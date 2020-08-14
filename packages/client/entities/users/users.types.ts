import { ErrorObject, IUser } from "@monorepo/shared/lib";

export interface IUserState {
  users: IUser[] | null;
  isPending: boolean;
  errors: ErrorObject[] | null;
}
