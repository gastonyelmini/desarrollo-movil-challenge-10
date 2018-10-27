import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBYa_j7uULGjtwltmC5tJ0aVIp-EIB7MaU',
  authDomain: 'react-native-test-11eb0.firebaseapp.com',
  databaseURL: 'https://react-native-test-11eb0.firebaseio.com',
  projectId: 'react-native-test-11eb0',
  storageBucket: 'react-native-test-11eb0.appspot.com',
  messagingSenderId: '1051844232768',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return auth
    .signInAnonymously()
    .then(() => auth.currentUser)
    .catch(error => console.error(error))
}

export default firebase
