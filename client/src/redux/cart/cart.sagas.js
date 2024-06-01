import { all, call, takeLatest, put } from 'redux-saga/effects';
import { clearCart } from './cartSlice';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest('user/signOutSuccess', clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}