import firebase from 'firebase'

const firebaseSignup = ({email, password}) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

const setUserdata = ({uid, email, name, department, permitSendMessage}) => {
  return firebase
    .database()
    .ref(`users/${uid}`)
    .set({email, name, department, permitSendMessage})
    .then(() => {
      window.alert('登録に成功しました')
    })
}

class SignupFormController {
  signup ({email, password, name, department, permitSendMessage}) {
    return new Promise((resolve) => {
      firebaseSignup({email, password})
        .then(({uid}) => {
          setUserdata({uid, email, name, department, permitSendMessage})
            .catch((error) => {
              window.alert(error.message)
              resolve()
            })
        }).catch((error) => {
          window.alert(error.message)
          resolve()
        })
    })
  }
}

export const signupFormController = new SignupFormController()
