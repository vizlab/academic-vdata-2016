import React from 'react'

import {Network} from './network'

export class ScalableNetwork extends React.Component {
  render () {
    const {nodes, edges, width, height} = this.props
    const scaledNodes = getScaledNodes({nodes, width, height})
    const scaledEdges = getScaledEdges({edges, width, height})
    return (
      <Network height={this.props.height} width={this.props.width} nodes={scaledNodes} edges={scaledEdges} />
    )
  }
}
ScalableNetwork.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array
}

const getScaledNodes = ({nodes, width, height}) => {
  return nodes.map((node) => {
    return Object.assign(node, {
      cx: width * node.normalizedX,
      cy: height * node.normalizedY
    })
  })
}

const getScaledEdges = ({edges, width, height}) => {
  return edges.map((edge) => {
    return Object.assign(edge, {
      x1: width * edge.normalizedX1,
      y1: height * edge.normalizedY1,
      x2: width * edge.normalizedX2,
      y2: height * edge.normalizedY2
    })
  })
}
