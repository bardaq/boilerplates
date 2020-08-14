import { combineReducers } from "redux";
import usersReducer from "@/entities/users";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
