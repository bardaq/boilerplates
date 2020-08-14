import { IUser } from "@monorepo/shared/lib";

//
export const FETCH_USERS = "FETCH_USERS";
export interface FetchUsersAction {
  type: typeof FETCH_USERS;
}
export function fetchUsers(): FetchUsersAction {
  return { type: FETCH_USERS };
}

//
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: { users: IUser[] | null };
}
export function FetchUsersSucccess(
  users: IUser[] | null
): FetchUsersSuccessAction {
  return { type: FETCH_USERS_SUCCESS, payload: { users } };
}

//
export const DELETE_USERS = "DELETE_USERS";
export interface DeleteUsersAction {
  type: typeof DELETE_USERS;
  payload: { ids: string[] };
}
export function deleteUsers(ids: string[]): DeleteUsersAction {
  return { type: DELETE_USERS, payload: { ids } };
}
