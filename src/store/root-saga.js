import {categoriesSaga} from "./categories/category.saga";
import {all, call} from 'redux-saga/effects';
import {userSagas} from "./user/user.saga";

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)])
}
