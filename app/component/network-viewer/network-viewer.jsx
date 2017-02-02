import React from 'react'
import {browserHistory} from 'react-router'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'

import {ResearcherNetworkBasic} from '../network/researcher-network-basic'

export class NetworkViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contentHeight: 0,
      contentWidth: 0
    }
  }

  componentWillMount () {
    this.updateRectSize()
    window.addEventListener('resize', this.updateRectSize.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateRectSize)
  }

  updateRectSize () {
    setTimeout(() => {
      const contentHeight = window.innerHeight - 100 | 0
      const contentWidth = window.innerWidth
      this.setState({
        contentHeight,
        contentWidth
      })
    }, 0)
  }

  render () {
    return (
      <div>
        <div style={{'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%', 'height': '100%'}}>
          <IconButton style={{'position': 'absolute', 'top': '1rem', 'left': '1rem'}} tooltip='back' onClick={browserHistory.goBack}>
            <NavigationArrowBack />
          </IconButton>
          <ResearcherNetworkBasic
            height={this.state.contentHeight}
            width={this.state.contentWidth}
          />
        </div>
      </div>
    )
  }
}
