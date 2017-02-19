import {max} from 'd3-array'
import {scaleLog} from 'd3-scale'

import {fetchNetworkData} from './fetch-network-data'
import {questionRankColors} from '../../constants'
import {researchersViewerCtrl} from '../network-viewer/researchers-viewer'

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
    this.listeners = []
    this.isLoaded = false
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
      this.nodes = this.rawNodes.map(d => Object.assign({}, d))
      this.edges = this.rawEdges.map(d => Object.assign({}, d))
      this.texts = this.rawTexts.map(d => Object.assign({}, d))
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
      this.edges = this.rawEdges.map((d) => Object.assign({}, d))
    }

    if (this.type === 'question') {
      this.nodes = this.rawNodes.map((node) => {
        return Object.assign({}, node, {
          'fill': getQuestionRankColors(node, 'A01')
        })
      })
      this.edges = this.rawEdges.map((d) => Object.assign({}, d))
      this.texts = this.rawTexts.map((d) => Object.assign({}, d))
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
      this.isLoaded = true
      this.rawNodes = nodes
      this.rawEdges = edges
      this.rawTexts = texts
      this.init()
      this.complete()
    })
  }

  getAllResearchKeyword () {
    const researchKeywords = new Set()
    this.rawNodes.map((node) => {
      if (node.data.keyword_1) researchKeywords.add(node.data.keyword_1)
      if (node.data.keyword_2) researchKeywords.add(node.data.keyword_2)
      if (node.data.keyword_3) researchKeywords.add(node.data.keyword_3)
      if (node.data.keyword_4) researchKeywords.add(node.data.keyword_4)
      if (node.data.keyword_5) researchKeywords.add(node.data.keyword_5)
    })
    return [...researchKeywords]
  }

  searchByKeyword (keyword) {
    if (!keyword) {
      this.init()
      this.complete()
      return
    }
    this.init()
    const idxs = []
    const searchedNodes = this.rawNodes.map(d => d.data).filter((d, idx) => {
      if (d.keyword_1 === keyword || d.keyword_2 === keyword || d.keyword_3 === keyword || d.keyword_4 === keyword || d.keyword_5 === keyword) {
        idxs.push(idx)
        return true
      }
      return false
    })
    idxs.forEach((idx) => {
      this.nodes[idx].normalizedRadius = this.nodes[idx].normalizedRadius * 3
      this.texts[idx].normalizedFontSize = this.texts[idx].normalizedFontSize * 5
    })
    researchersViewerCtrl.setResearchers(searchedNodes)
    this.complete()
  }

  onClickNode (node, idx) {
    researchersViewerCtrl.setResearchers([node])
    this.init()
    this.nodes[idx].normalizedRadius = this.nodes[idx].normalizedRadius * 3
    this.texts[idx].normalizedFontSize = this.texts[idx].normalizedFontSize * 5
    this.complete()
  }

  register (listener) {
    this.listeners.push(() => { listener({nodes: this.nodes, edges: this.edges, texts: this.texts}) })
  }

  complete () {
    this.listeners.forEach((listener) => { listener() })
  }

  dispose () {
    this.listeners = []
  }
}
export const networkCtrl = new NetworkCtrl()
