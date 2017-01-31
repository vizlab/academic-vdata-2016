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
      width: 0,
      height: 0,
      isLoaded: false
    }

    this.marginRatio = 0.1
    this.heightRatio = 0.8
  }

  componentDidMount () {
    this.updateRectSize()
    window.addEventListener('resize', this.onResize.bind(this))
    storage.ref('nodes.csv').getDownloadURL().then((url) => {
      csv(url, (nodeData) => {
        this.afterFetch(nodeData)
      })
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize () {
    this.updateRectSize()
    const nodes = this.state.nodes.map((node) => {
      return Object.assign(node, {
        cx: this.state.width * node.normalizedX,
        cy: this.state.height * node.normalizedY
      })
    })
    this.setState({nodes})
  }

  afterFetch (nodeData) {
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
        'fill': 'gray'
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
      {this.state.isLoaded ? <Network width={this.state.width} height={this.state.height} nodes={this.state.nodes} /> : <Loading />}
    </div>
  }
}
