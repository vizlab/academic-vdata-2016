import React from 'react'

import {Loading} from '../utils/loading'
import {ScalableNetwork} from './scalable-network'

import {networkDataFormatter} from './network-data-formatter'

export class ResearcherNetworkBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      edges: [],
      texts: [],
      width: 0,
      height: 0,
      isLoaded: false
    }

    this.nodeData = []
    this.edgeData = []
  }

  componentWillMount () {
    networkDataFormatter().then(({nodes, edges, texts, nodeData, edgeData}) => {
      this.nodeData = nodeData
      this.edgeData = edgeData
      this.afterDataLoad({nodes, edges, texts})
      this.setState({isLoaded: true})
    })
  }

  afterDataLoad ({nodes, edges, texts}) {
    this.setState({nodes, edges, texts})
  }

  render () {
    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        {
          this.state.isLoaded
          ? <ScalableNetwork width={this.props.width} height={this.props.height} nodes={this.state.nodes} edges={this.state.edges} texts={this.state.texts} />
          : <Loading />
        }
      </div>
    )
  }
}
ResearcherNetworkBasic.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
