import React from 'react'

export class Network extends React.Component {
  render () {
    return <svg width={this.props.width} height={this.props.height}>
      <g>
        {this.props.edges.map((edge) => {
          return <line x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} key={edge.key} strokeWidth={edge.strokeWidth} stroke={edge.stroke} />
        })}
      </g>
      <g>
        {this.props.nodes.map((node) => {
          return <circle key={node.key} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} />
        })}
      </g>
    </svg>
  }
}
Network.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}
