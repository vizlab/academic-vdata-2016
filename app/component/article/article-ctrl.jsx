import React from 'react'
import {
  locationShape,
  browserHistory
} from 'react-router'
import firebase from 'firebase'

import {Loading} from '../utils/loading'

export class ArticleCtrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false,
      loading: true
    }
  }

  componentDidMount () {
    this.removeListener = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authed: true,
            loading: false
          })
        } else {
          window.alert('ログインする必要があります')
          browserHistory.push('/login')
        }
      }, (err) => {
        window.alert(err.message)
        browserHistory.push('/login')
      })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    return this.state.loading === true ? <Loading /> : (
      <div>
        {this.props.children}
      </div>
    )
  }
}
ArticleCtrl.propTypes = {
  children: React.PropTypes.object,
  location: locationShape
}
