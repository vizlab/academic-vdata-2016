import {max} from 'd3-array'
import {scaleLog} from 'd3-scale'

import {fetchNetworkData} from './fetch-network-data'
import {questionRankColors} from '../../constants'

const getQuestionRankColors = (node, qId) => {
  return questionRankColors[Number(node.data[qId])]
}

class NetworkCtrl {
  constructor () {
    this.rawNodes = []
    this.rawEdges = []
    this.rawTexts = []
    this.nodes = []
    this.edges = []
    this.texts = []
    this.type = ''
  }

  setBasicMode () {
    this.type = 'basic'
  }

  setBetweennessMode () {
    this.type = 'betweenness'
  }

  setQuestionMode () {
    this.type = 'question'
  }

  init () {
    if (this.type === 'basic') {
      this.nodes = [].concat(this.rawNodes)
      this.edges = [].concat(this.rawEdges)
      this.texts = [].concat(this.rawTexts)
    }

    if (this.type === 'betweenness') {
      const centralityMax = max(this.rawNodes,
        (d) => Number(d.data['betweenness_centrality'])
      )
      const nodeLogScale = scaleLog()
        .base(Math.E)
        .domain([1, centralityMax + 1])
        .range([0.3, 5])
      const textLogScale = scaleLog()
        .base(Math.E)
        .domain([1, centralityMax + 1])
        .range([0.2, 4])
      this.nodes = this.rawNodes.map((node) => {
        return Object.assign({}, node, {
          normalizedRadius: nodeLogScale(1 + Number(node.data['betweenness_centrality']))
        })
      })
      this.texts = this.rawTexts.map((text) => {
        return Object.assign({}, text, {
          normalizedFontSize: textLogScale(1 + Number(text.data['betweenness_centrality']))
        })
      })
      this.edges = [].concat(this.rawEdges)
    }

    if (this.type === 'question') {
      this.nodes = this.rawNodes.map((node) => {
        return Object.assign({}, node, {
          'fill': getQuestionRankColors(node, 'A01')
        })
      })
      this.edges = [].concat(this.rawEdges)
      this.texts = [].concat(this.rawTexts)
    }
  }

  setColorByQuestionId (questionId) {
    this.nodes = this.rawNodes.map((node) => {
      return Object.assign({}, node, {
        'fill': getQuestionRankColors(node, questionId)
      })
    })
  }

  getData () {
    return fetchNetworkData().then(({nodes, edges, texts}) => {
      this.rawNodes = nodes
      this.rawEdges = edges
      this.rawTexts = texts
      this.init()
    })
  }

  onClickNode (node) {
    console.log(node)
  }

  getNodes () {
    return this.nodes
  }

  getEdges () {
    return this.edges

  }

  getTexts () {
    return this.texts
  }
}

export const networkCtrl = new NetworkCtrl()
