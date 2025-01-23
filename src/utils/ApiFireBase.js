import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc
} from 'firebase/firestore';
import {
  getAuth,
  initializeAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider, 
  OAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicionado

const firebaseConfig = {
  apiKey: "#############",
  authDomain: "###################",
  projectId: "##################",
  storageBucket: "##################",
  messagingSenderId: "###################",
  appId: "###############################",
  measurementId: "################3"
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializando a autenticação com persistência de sessão via AsyncStorage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(firebaseApp);

export default {
  googleAuthApp: async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
      .then((resp) => {
        return GoogleAuthProvider.credentialFromResult(resp);
      })
      .catch((error) => {
        return GoogleAuthProvider.credentialFromError(error);
      });
  },

  facebookAuthApp: async () => {
    return await signInWithPopup(auth, new FacebookAuthProvider())
      .then((resp) => {
        return FacebookAuthProvider.credentialFromResult(resp);
      })
      .catch((error) => {
        return FacebookAuthProvider.credentialFromError(error);
      });
  },

  appleAuthApp: async () => {
    return await signInWithPopup(auth, new OAuthProvider('apple.com'))
      .then((resp) => {
        return OAuthProvider.credentialFromResult(resp);
      })
      .catch((error) => {
        return OAuthProvider.credentialFromError(error);
      });
  },

  signInWithEmailAndPassword: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        return error;
      });
  },

  createUserWithEmailAndPassword: async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('email sent');
          });
        return userCredential;
      })
      .catch((error) => {
        return error;
      });
  },

  onAuthStateChanged: async () => {
    return await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, return user data
        return user;
      } else {
        // User is signed out
        return null;
      }
    });
  },

  signOut: async () => {
    return await signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      return error;
    });
  },

  addCollection: async (obj, table) => {
    return await addDoc(collection(db, table), obj);
  },

  setCollection: async (obj, table, id) => {
    return await setDoc(doc(collection(db, table), id), obj);
  }
};
