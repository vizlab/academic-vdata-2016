import React from 'react'

export class Network extends React.Component {
  render () {
    return <svg width={this.props.width} height={this.props.height}>
      <g id='nodes'>
        {this.props.nodes.map((node) => {
          return <circle key={node.id} cx={node.x} cy={node.y} r={node.r} fill={node.color} />
        })}
      </g>
      <g />
    </svg>
  }
}
Network.propTypes = {
  nodes: React.PropTypes.object,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}
