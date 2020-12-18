import firebase from "firebase/app";
import "firebase/firestore";


const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: 'allun-ga',  // does not work from .env
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(config);

export default firebase.firestore();
