import { takeLatest, put } from "redux-saga/effects";

import { FETCH_USERS, FetchUsersSucccess } from "./users.actions";
import * as API from "./users.api";

function* onFetchUser() {
  const { users, error } = yield API.fetchUsers();
  if (error) {
    alert(error.message);
    // put error to the redux
  }
  yield put(FetchUsersSucccess(users));
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS, onFetchUser);
}
