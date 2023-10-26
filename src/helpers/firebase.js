import { getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const {
	REACT_APP_firebase_apiKey: apiKey,
	REACT_APP_firebase_appId: appId,
	REACT_APP_firebase_authDomain: authDomain,
	REACT_APP_firebase_databaseURL: databaseURL,
	REACT_APP_firebase_messagingSenderId: messagingSenderId,
	REACT_APP_firebase_projectId: projectId,
	REACT_APP_firebase_storageBucket: storageBucket,
} = process.env

const firebaseConfig = {
	apiKey,
	appId,
	authDomain,
	databaseURL,
	messagingSenderId,
	projectId,
	storageBucket,
}

const app = initializeApp(firebaseConfig)

export const firebase = getDatabase(app)
