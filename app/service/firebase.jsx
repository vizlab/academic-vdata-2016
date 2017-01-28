import firebase from 'firebase'

import {apiKey, authDomain, databaseURL, storageBucket} from '../constants'

const config = {apiKey, authDomain, databaseURL, storageBucket}

firebase.initializeApp(config)

export const storage = firebase.storage()
