import React from 'react'
import {locationShape} from 'react-router'

export class RootComponent extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
RootComponent.propTypes = {
  children: React.PropTypes.object,
  location: locationShape
}
