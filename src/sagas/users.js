import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({ items: result.data.data }));
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to get the users'
        }));
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* deleteUser({ payload }) {
    try {
        yield call(api.deleteUser, payload.userId);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the user'
        }));
    }
}

function* watchDeleteUserRequest() {
    yield takeEvery(actions.Types.DELETE_USER_REQUEST, deleteUser);
}

function* createUser({ payload }) {
    try {
        yield call(api.createUser, payload);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }));
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* updateUser({ payload }) {
    try {
        yield call(api.updateUser, payload);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to update the user'
        }));
    }
}

function* watchUpdateUserRequest() {
    yield takeLatest(actions.Types.UPDATE_USER_REQUEST, updateUser);
}

function* fetchUser(action) {
    try {
      const user = yield call(api.fetchUser, action.payload);
      yield put(actions.fetchUserSuccess(user));
    } catch (error) {
      yield put(actions.usersError({
        error: 'An error occurred when trying to fetch the user'
      }));
    }
  }
  
  function* watchFetchUserRequest() {
    yield takeLatest(actions.Types.FETCH_USER_REQUEST, fetchUser);
  }

const userSagas = [
    fork(watchGetUsersRequest),
    fork(watchDeleteUserRequest),
    fork(watchCreateUserRequest),
    fork(watchUpdateUserRequest),
    fork(watchFetchUserRequest)
];

export default userSagas;
