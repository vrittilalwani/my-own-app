import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDWZXQumv8kUhBwnkuvhJWXv3pq-TkPpgk',
  authDomain: 'school-app-8675e.firebaseapp.com',
  projectId: 'school-app-8675e',
  storageBucket: 'school-app-8675e.appspot.com',
  messagingSenderId: '141812727105',
  appId: '1:141812727105:web:d49d65894380581b07f5c0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore;
