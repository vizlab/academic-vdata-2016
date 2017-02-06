import React from 'react'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom'

export class Network extends React.Component {
  constructor (props) {
    super(props)
    this.Viewer = null
  }

  componentDidMount () {
    if (this.props.withTools) this.Viewer.fitToViewer()
  }

  svg () {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g>
          {this.props.edges.map((edge) => {
            return <line x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} key={edge.key} strokeWidth={edge.strokeWidth} stroke={edge.stroke} strokeOpacity={edge.strokeOpacity} />
          })}
        </g>
        <g>
          {this.props.nodes.map((node) => {
            return <circle key={node.key} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} />
          })}
        </g>
        <g>
          {
            this.props.texts.map((text) => {
              return (
                <text
                  key={text.key}
                  x={text.x}
                  y={text.y}
                  fontSize={text.fontSize}
                  fill={text.fill}
                  stroke={text.stroke}
                  strokeWidth={text.strokeWidth}
                  paintOrder={text.paintOrder}
                >
                  {text.text}
                </text>
              )
            })
          }
        </g>
      </svg>
    )
  }

  zoomIn () {
    this.Viewer.zoomOnViewerCenter(2)
  }

  zoomOut () {
    this.Viewer.zoomOnViewerCenter(0.5)
  }

  zoomReset () {
    this.Viewer.reset()
  }

  render () {
    return this.props.withTools
    ? (
      <div style={{'position': 'relative'}}>
        <ReactSVGPanZoom
          width={this.props.width}
          height={this.props.height}
          ref={(Viewer) => { this.Viewer = Viewer }}
          tool='pan'
          detectWheel={false}
          autoPan={false}
          background='white'
          toolbarPosition='none'
        >
          {this.svg()}
        </ReactSVGPanZoom>
        <div style={{'position': 'absolute', 'left': 20, 'bottom': 20}}>
          <button onClick={() => { this.zoomIn() }}>zoom in</button>
          <button onClick={() => { this.zoomOut() }}>zoom out</button>
          <button onClick={() => { this.zoomReset() }}>reset</button>
        </div>
      </div>)
    : <div>{this.svg()}</div>
  }
}
Network.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array,
  texts: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  withTools: React.PropTypes.bool
}
