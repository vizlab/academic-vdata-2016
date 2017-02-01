import React from 'react'
import {locationShape} from 'react-router'
import {Footer} from '../footer/footer'

export class RootComponent extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
RootComponent.propTypes = {
  children: React.PropTypes.object,
  location: locationShape
}
