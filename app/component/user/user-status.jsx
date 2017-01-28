import React from 'react'
import firebase from 'firebase'

export class UserStatusComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isLoggedIn: !!user
      })
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    return (
      <span>
        {this.state.isLoggedIn ? 'auth' : 'unauth'}
      </span>
    )
  }
}
