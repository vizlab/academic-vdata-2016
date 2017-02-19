import React from 'react'

import {Loading} from '../utils/loading'
import {ScalableNetwork} from './scalable-network'
import {networkCtrl} from './network-ctrl'

export class ResearcherNetworkBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      isLoaded: false,
      nodes: []
    }
    networkCtrl.setBasicMode()
  }

  componentWillMount () {
    networkCtrl.getData().then(() => {
      this.setState({isLoaded: true})
    })
    networkCtrl.register(({nodes, edges, texts}) => {
      this.setState({nodes})
    })
  }

  componentWillUnmont () {
    networkCtrl.dispose()
  }

  render () {
    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        {
          this.state.isLoaded
          ? <ScalableNetwork
            width={this.props.width}
            height={this.props.height}
            nodes={this.state.nodes}
            edges={networkCtrl.getEdges()}
            texts={networkCtrl.getTexts()}
            withTools={this.props.withTools}
          />
          : <div style={{'width': this.props.width, 'height': this.props.height}}>
            <Loading />
          </div>
        }
      </div>
    )
  }
}
ResearcherNetworkBasic.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  withTools: React.PropTypes.bool
}

export class InteractiveResearcherNetworkBasic extends React.Component {
  render () {
    return (
      <div>
        <ResearcherNetworkBasic
          height={this.props.height}
          width={this.props.width}
          withTools
        />
      </div>
    )
  }
}
InteractiveResearcherNetworkBasic.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
