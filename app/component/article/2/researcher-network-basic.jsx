import React from 'react'
import {csv} from 'd3-request'
import ReactDOM from 'react-dom'

import {Loading} from '../../utils/loading'
import {storage} from '../../../service/firebase'
import {Network} from '../../network/network'

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
  }

  componentDidMount () {
    this.updateRectSize()
    this.addEventListener()

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
    window.removeEventListener('resize', this.onResize)
  }

  addEventListener () {
    let timer
    window.addEventListener('resize', () => {
      clearTimeout(timer)
      timer = window.setTimeout(this.onResize.bind(this), 500)
    })
  }

  onResize () {
    if (!this.updateRectSize()) return
    const nodes = this.state.nodes.map((node) => {
      return Object.assign(node, {
        cx: this.state.width * node.normalizedX,
        cy: this.state.height * node.normalizedY
      })
    })
    const edges = this.state.edges.map((edge) => {
      return Object.assign(edge, {
        x1: this.state.width * edge.normalizedX1,
        y1: this.state.height * edge.normalizedY1,
        x2: this.state.width * edge.normalizedX2,
        y2: this.state.height * edge.normalizedY2
      })
    })
    this.setState({nodes, edges})
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
      const x1 = this.state.width * normalizedX1
      const y1 = this.state.height * normalizedY1
      const x2 = this.state.width * normalizedX2
      const y2 = this.state.height * normalizedY2
      edges.push({
        x1,
        y1,
        x2,
        y2,
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
      const cx = this.state.width * normalizedX
      const cy = this.state.height * normalizedY
      nodes.push({
        cx,
        cy,
        normalizedX,
        normalizedY,
        'r': 4,
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
    const oldWidth = this.state.width
    const oldHeight = this.state.height
    return oldWidth === width && oldHeight === height
  }

  render () {
    return <div>
      {this.state.isLoaded ? <Network width={this.state.width} height={this.state.height} nodes={this.state.nodes} edges={this.state.edges} /> : <Loading />}
    </div>
  }
}
