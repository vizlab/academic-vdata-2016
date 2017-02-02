import React from 'react'

import {Loading} from './loading'
import {cacheLoader} from '../../service/cache-loader'

export class FirebaseImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      src: ''
    }
  }

  componentDidMount () {
    cacheLoader.getFileUrlFromFirebaseStorage(this.props.src).then((url) => {
      this.setState({
        isLoaded: true,
        src: url
      })
    })
  }

  render () {
    return <div>
      {this.state.isLoaded ? <img src={this.state.src} style={this.props.imgStyle} /> : <Loading />}
    </div>
  }
}
FirebaseImg.propTypes = {
  src: React.PropTypes.string,
  imgStyle: React.PropTypes.object
}
