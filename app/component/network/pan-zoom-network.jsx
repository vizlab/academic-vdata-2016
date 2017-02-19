import React from 'react'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import ZoomOut from 'material-ui/svg-icons/action/zoom-out'
import ZoomOutMap from 'material-ui/svg-icons/maps/zoom-out-map'
import {voronoi} from 'd3-voronoi'

import {networkCtrl} from './network-ctrl'

export class PanZoomNetwork extends React.Component {
  constructor (props) {
    super(props)
    this.Viewer = null

    this.state = {
      showTexts: true
    }
  }

  polygons () {
    const coords = this.props.nodes.map(({cx, cy}) => [cx, cy])
    const polygons = voronoi()
      .polygons(coords)
      .map((d) => d.filter((d) => !!d).map((point) => point.join(',')))
      .map((d, idx) =>
        <polygon
          points={d}
          key={idx}
          onClick={() => { networkCtrl.onClickNode(this.props.nodes[idx].data, idx) }}
          opacity={0}
        />)
    return polygons
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
            return (
              <circle
                key={node.key}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={node.fill}
              />
            )
          })}
        </g>
        {
          this.state.showTexts
            ? <g>
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
            : null
        }
        <g>
          {this.polygons()}
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
    return (
      <div
        style={{'position': 'relative'}}
      >
        <ReactSVGPanZoom
          width={this.props.width}
          height={this.props.height}
          ref={(Viewer) => { this.Viewer = Viewer }}
          tool='auto'
          detectWheel={false}
          detectAutoPan={false}
          autoPan={false}
          background='white'
          toolbarPosition='none'
          onChangeValue={(v) => { this.setState({'showTexts': v.mode !== 'panning'}) }}
        >
          {this.svg()}
        </ReactSVGPanZoom>
        <div style={{'position': 'absolute', 'left': 20, 'bottom': 20}}>
          <IconButton tooltip='zoom in' touch tooltipPosition='top-right' onClick={() => { this.zoomIn() }}>
            <ZoomIn />
          </IconButton>
          <IconButton tooltip='zoom out' touch tooltipPosition='top-right' onClick={() => { this.zoomOut() }}>
            <ZoomOut />
          </IconButton><IconButton tooltip='reset' touch tooltipPosition='top-right' onClick={() => { this.zoomReset() }}>
            <ZoomOutMap />
          </IconButton>
        </div>
      </div>)
  }
}
PanZoomNetwork.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array,
  texts: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}
