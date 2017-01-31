import React from 'react'
import {csv} from 'd3-request'
import ReactDOM from 'react-dom'

import {storage} from '../../../service/firebase'
import {Network} from '../../network/network'

export class ReactNetworkBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      width: 0,
      height: 0
    }
  }

  componentDidMount () {
    this.afterResize()
    window.addEventListener('resize', this.afterResize)
    storage.ref('nodes.csv').getDownloadURL().then((url) => {
      csv(url, (nodeData) => {
        this.afterFetch(nodeData)
      })
    })
  }

  componentWillUnmount () {

  }

  afterResize () {
    const {width} = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const height = window.innerHeight
    const nodes = this.state.nodes.map((node) => {
      return Object.assign(node, {
        x: this.state.width * node.normalizedX,
        y: this.state.height * node.normalizedY
      })
    })
    this.setState({height, width, nodes})
  }

  afterFetch (nodeData) {
    const nodes = []
    nodeData.forEach((datum) => {
      const normalizedX = Number(datum.x)
      const normalizedY = Number(datum.y)
      const x = this.state.width * normalizedX
      const y = this.state.height * normalizedY
      nodes.push({
        x,
        y,
        normalizedX,
        normalizedY,
        'r': 4,
        'id': `node_${datum.id}`,
        'color': 'gray'
      })
    })
    this.setState({nodes})
  }

  render () {
    return <div>
      <Network width={this.state.width} height={this.state.height} nodes={this.state.nodes} />
    </div>
  }
}
