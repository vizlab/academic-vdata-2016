import firebase from 'firebase'

import {apiKey, authDomain, databaseURL} from '../constants'

const config = {apiKey, authDomain, databaseURL}

firebase.initializeApp(config)
