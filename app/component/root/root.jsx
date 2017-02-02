import React from 'react'
import {browserHistory} from 'react-router'
import {Footer} from '../footer/footer'

export class RootComponent extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        {
          browserHistory.getCurrentLocation().pathname === '/network-viewer'
          ? ''
          : <Footer />
        }
      </div>
    )
  }
}
RootComponent.propTypes = {
  children: React.PropTypes.object
}
