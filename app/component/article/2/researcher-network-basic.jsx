import React from 'react'
import {csv} from 'd3-request'
import ReactDOM from 'react-dom'

import {Loading} from '../../utils/loading'
import {storage} from '../../../service/firebase'
import {ScalableNetwork} from '../../network/scalable-network'

export class ReactNetworkBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      edges: [],
      width: 0,
      height: 0,
      isLoaded: false
    }

    this.marginRatio = 0.1
    this.heightRatio = 0.8
    this.r = 4
  }

  componentDidMount () {
    this.updateRectSize()
    window.addEventListener('resize', this.updateRectSize.bind(this))

    storage.ref('nodes.csv').getDownloadURL().then((url) => {
      csv(url, (nodeData) => {
        this.afterFetchNodeData(nodeData)
        storage.ref('edges.csv').getDownloadURL().then((url) => {
          csv(url, (edgeData) => {
            this.afterFetchEdgeData({nodeData, edgeData})
          })
        })
      })
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateRectSize)
  }

  afterFetchEdgeData ({edgeData, nodeData}) {
    const id2Node = {}
    nodeData.forEach((node) => {
      id2Node[node.id] = node
    })
    const edges = []
    edgeData.forEach((edgeDatum, idx) => {
      const [source, target] = Object.values(edgeDatum).map(id => id2Node[id])
      const normalizedX1 = Number(source.x) * (1 - this.marginRatio) + this.marginRatio / 2
      const normalizedY1 = Number(source.y) * (1 - this.marginRatio) + this.marginRatio / 2
      const normalizedX2 = Number(target.x) * (1 - this.marginRatio) + this.marginRatio / 2
      const normalizedY2 = Number(target.y) * (1 - this.marginRatio) + this.marginRatio / 2
      edges.push({
        normalizedX1,
        normalizedY1,
        normalizedX2,
        normalizedY2,
        key: `edge_${idx}`,
        strokeWidth: 1,
        stroke: 'gray'
      })
    })
    this.setState({edges})
  }

  afterFetchNodeData (nodeData) {
    const nodes = []
    nodeData.forEach((datum) => {
      const normalizedX = Number(datum.x) * (1 - this.marginRatio) + this.marginRatio / 2
      const normalizedY = Number(datum.y) * (1 - this.marginRatio) + this.marginRatio / 2
      nodes.push({
        normalizedX,
        normalizedY,
        'r': this.r,
        'key': `node_${datum.id}`,
        'fill': 'black'
      })
    })
    this.setState({nodes, isLoaded: true})
  }

  updateRectSize () {
    const {width} = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const height = window.innerHeight * this.heightRatio
    this.setState({width, height})
  }

  render () {
    return <div>
      {
        this.state.isLoaded
        ? <ScalableNetwork width={this.state.width} height={this.state.height} nodes={this.state.nodes} edges={this.state.edges} />
        : <Loading />
      }
    </div>
  }
}
