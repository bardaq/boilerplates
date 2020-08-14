import { all } from "redux-saga/effects";
import userSaga from "@/entities/users/users.saga";

function* rootSaga() {
  yield all([userSaga()]);
}

export default rootSaga;
