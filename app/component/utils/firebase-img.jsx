import React from 'react'
import {storage} from '../../service/firebase'
import {Loading} from './loading'

export class FirebaseImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      src: ''
    }
  }

  componentDidMount () {
    storage.ref(this.props.src).getDownloadURL().then((url) => {
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
