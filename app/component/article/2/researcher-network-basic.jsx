import React from 'react'
import {csv} from 'd3-request'

import {storage} from '../../../service/firebase'
import {Network} from '../../network/network'

export class ReactNetworkBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: []
    }
  }

  componentDidMount () {
    storage.ref('nodes.csv').getDownloadURL().then((url) => {
      const nodes = []
      csv(url, (nodeData) => {
        nodeData.forEach((datum) => {
          nodes.push({
            'x': this.props.width * Number(datum.x) / 2,
            'y': this.props.height * Number(datum.y) / 2,
            'r': 4,
            'id': `node_${datum.id}`,
            'color': 'gray'
          })
        })
        this.setState({nodes})
      })
    })
  }

  render () {
    return <div>
      <Network width={this.props.width} height={this.props.height} nodes={this.state.nodes} />
    </div>
  }
}
