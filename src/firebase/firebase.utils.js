import { initializeApp} from 'firebase/app';
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut,createUserWithEmailAndPassword} from 'firebase/auth';
import { collection,getDocs,doc, getDoc,setDoc, getFirestore,writeBatch} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAokLFsscIqKiWg8y1O8LDDFd4WuRdbym0",
    authDomain: "shop-ease-v1.firebaseapp.com",
    projectId: "shop-ease-v1",
    storageBucket: "shop-ease-v1.appspot.com",
    messagingSenderId: "282133599302",
    appId: "1:282133599302:web:8adae52a5c5d6438ca2647",
    measurementId: "G-PP6ELYKDSK"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    'prompt': 'select_account'
  });




//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db,`users/${userAuth.uid}`)
  

  const snapShot = await getDoc(userRef);

  

  if (!snapShot.exists()) {
    
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef,{
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
 
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};




export {auth,db,signInWithEmailAndPassword,signInWithPopup,googleProvider,createUserWithEmailAndPassword,onAuthStateChanged,signOut,createUserProfileDocument,getDoc,collection,getDocs};





