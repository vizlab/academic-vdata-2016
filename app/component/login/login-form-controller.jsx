import firebase from 'firebase'

class LoginFormController {
  login (email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        window.alert(error.message)
      })
  }
}

export const loginFormController = new LoginFormController()
