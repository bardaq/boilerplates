import { IUserState } from "./users.types";

import { AnyAction } from "redux";
import { FETCH_USERS, FETCH_USERS_SUCCESS } from "./users.actions";

const initialState: IUserState = {
  users: [],
  isPending: false,
  errors: [],
};

export default function usersReducer(
  state = initialState,
  action: AnyAction
): IUserState {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, isPending: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload.users, isPending: false };
    default:
      return state;
  }
}
