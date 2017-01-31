import React from 'react'

export class Network extends React.Component {
  render () {
    return <svg width={this.props.width} height={this.props.height}>
      <g id='nodes'>
        {this.props.nodes.map((node) => {
          return <circle key={node.key} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} />
        })}
      </g>
      <g />
    </svg>
  }
}
Network.propTypes = {
  nodes: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}
