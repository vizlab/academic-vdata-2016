import React from 'react'
import {FlatButton} from 'material-ui'
import firebase from 'firebase'

import {supportEmail} from '../../constants'

export class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  componentDidMount () {
    this.removeListener = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            email: user.email
          })
        } else {
          this.setState({
            email: ''
          })
        }
      })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  logout () {
    firebase.auth().signOut()
      .then(() => {})
      .catch(() => {})
  }

  render () {
    return (
      <footer style={{'textAlign': 'left', 'padding': '4rem 0', 'marginTop': '4rem', 'fontSize': '85%', 'backgroundColor': '#f7f7f7'}}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              SUPPORT: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </div>
            {
              !this.state.email
              ? ''
              : <div className='col-md-6'>
                <div>
                  {this.state.email}
                </div>
                <div>
                  <FlatButton label='logout' onClick={this.logout} />
                </div>
              </div>
            }
          </div>
        </div>
      </footer>
    )
  }
}
