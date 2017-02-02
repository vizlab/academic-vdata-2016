import React from 'react'
import firebase from 'firebase'
import {browserHistory} from 'react-router'
import ReactGA from 'react-ga'

import {LoginForm} from './login-form'
import {SignupForm} from './signup-form'
import {LoginImg} from './login-img'

export class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.removeListener = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          ReactGA.set({userId: user.uid})
          browserHistory.push('/articles')
        } else {
          this.setState({
            loading: false
          })
        }
      })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    return this.state.loading ? <div /> : (
      <div>
        <LoginImg />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6'>
              <LoginForm />
            </div>
            <div className='col-md-6'>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
