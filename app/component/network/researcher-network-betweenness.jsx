import React from 'react'
import {ResearcherNetworkBasic} from './researcher-network-basic'

import {max} from 'd3-array'
import {scaleLog} from 'd3-scale'

export class ResearcherNetworkBetweenness extends ResearcherNetworkBasic {
  afterDataLoad ({nodes, edges, texts}) {
    const centralityMax = max(this.nodeData,
      (d) => Number(d['betweenness_centrality'])
    )
    const nodeLogScale = scaleLog()
      .base(Math.E)
      .domain([1, centralityMax + 1])
      .range([0.3, 5])
    const textLogScale = scaleLog()
      .base(Math.E)
      .domain([1, centralityMax + 1])
      .range([0.2, 4])
    const scaledNodes = nodes.map((node) => {
      return Object.assign(node, {
        normalizedRadius: nodeLogScale(1 + Number(node.data['betweenness_centrality']))
      })
    })
    const scaledTexts = texts.map((text) => {
      return Object.assign(text, {
        normalizedFontSize: textLogScale(1 + Number(text.data['betweenness_centrality']))
      })
    })
    this.setState({
      nodes: scaledNodes,
      texts: scaledTexts,
      edges: edges
    })
  }
}

export class InteractiveResearcherNetworkBetweenness extends React.Component {
  render () {
    return (
      <div>
        <ResearcherNetworkBetweenness
          height={this.props.height}
          width={this.props.width}
          withTools
        />
      </div>
    )
  }
}
InteractiveResearcherNetworkBetweenness.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
