import { IUser, ErrorObject } from "@monorepo/shared/lib";

import FetchAPI from "@/common/FetchAPI";

export const fetchUsers = () =>
  (FetchAPI.GET("users") as unknown) as IUser[] | null | ErrorObject;
