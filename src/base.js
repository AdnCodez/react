import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBv8nYsbuN_yoCCJxJgjMY-mQarUoFz8Ro",
    authDomain: "restaurent-menu-5ab77.firebaseapp.com",
    databaseURL: "https://restaurent-menu-5ab77.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// this is a named export
export {firebaseApp}
// this is a default export
export default base;