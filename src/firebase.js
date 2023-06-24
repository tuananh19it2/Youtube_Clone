import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyBXmPyvY-4wBXBS4bJDVDqjUJdROpFXIR8",
  authDomain: "ytb-clon1.firebaseapp.com",
  projectId: "ytb-clon1",
  storageBucket: "ytb-clon1.appspot.com",
  messagingSenderId: "14624157786",
  appId: "1:14624157786:web:0ad885b41b5dfaac4d6863"
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();