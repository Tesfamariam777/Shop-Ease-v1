import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './userSlice';

import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';
import { getDoc } from 'firebase/firestore';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
     const userSnapshot = yield getDoc(userRef);

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth,googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload : {email,password}}) {
   try {
    console.log(email,password);
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    console.log('user',user);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* sign_out() {
    
  try {
    yield signOut(auth);
    yield put(signOutSuccess());
    } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const {user} = yield createUserWithEmailAndPassword(auth,email, password);
    
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest('user/googleSignInStart', signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest('user/emailSignInStart', signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest('user/checkUserSession', isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest('user/signOutStart', sign_out);
}

export function* onSignUpStart() {
  yield takeLatest('user/signUpStart', signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest('user/signUpSuccess', signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}