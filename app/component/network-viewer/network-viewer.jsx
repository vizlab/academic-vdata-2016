import React from 'react'
import {browserHistory} from 'react-router'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'

import {InteractiveResearcherNetworkBasic} from '../network/researcher-network-basic'
import {InteractiveResearcherNetworkBetweenness} from '../network/researcher-network-betweenness'
import {InteractiveResearcherNetworkQuestion} from '../network/researcher-network-question'

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
      const contentHeight = window.innerHeight > 0 ? window.innerHeight : 0
      const contentWidth = window.innerWidth
      this.setState({
        contentHeight,
        contentWidth
      })
    }, 0)
  }

  render () {
    const type = this.props.location.query.type
    return (
      <div>
        <div style={{'position': 'relative', 'width': '100%', 'height': '100%'}}>
          <IconButton style={{'zIndex': 1000, 'position': 'absolute', 'top': '1rem', 'left': '1rem'}} tooltip='back' onClick={browserHistory.goBack}>
            <NavigationArrowBack />
          </IconButton>
          {
            type === 'basic'
            ? <InteractiveResearcherNetworkBasic
              height={this.state.contentHeight}
              width={this.state.contentWidth}
              />
            : ''
          }
          {
            type === 'betweenness'
            ? <InteractiveResearcherNetworkBetweenness
              height={this.state.contentHeight}
              width={this.state.contentWidth}
              />
            : ''
          }
          {
            type === 'question'
            ? <InteractiveResearcherNetworkQuestion
              height={this.state.contentHeight}
              width={this.state.contentWidth}
              />
            : ''
          }
        </div>
      </div>
    )
  }
}
NetworkViewer.propTypes = {
  location: React.PropTypes.object
}
