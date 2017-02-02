import {cacheLoader} from '../../service/cache-loader'
import {c40} from '../../constants'

const marginRatio = 0.1
const defaultRadius = 1

const nodeDataFormatter = (nodeData) => {
  const nodes = []
  const texts = []
  nodeData.forEach((datum) => {
    const normalizedX = Number(datum.x) * (1 - marginRatio) + marginRatio / 2
    const normalizedY = Number(datum.y) * (1 - marginRatio) + marginRatio / 2
    nodes.push({
      normalizedX,
      normalizedY,
      'key': `node_${datum.id}`,
      'fill': c40[Number(datum['Modularity Class'])],
      'normalizedRadius': defaultRadius,
      data: datum
    })
    texts.push({
      normalizedX,
      normalizedY,
      'text': datum['keyword_1'],
      'key': `text_${datum.id}`,
      'fill': '#333333',
      'stroke': '#ffffff',
      'paintOrder': 'stroke',
      'normalizedFontSize': 1,
      data: datum
    })
  })
  return {nodes, texts}
}

const edgeDataFormatter = ({nodeData, edgeData}) => {
  const id2Node = {}
  nodeData.forEach((node) => {
    id2Node[node.id] = node
  })
  const edges = []
  edgeData.forEach((edgeDatum, idx) => {
    const [source, target] = Object.keys(edgeDatum).map(key => edgeDatum[key]).map(id => id2Node[id])
    const normalizedX1 = Number(source.x) * (1 - marginRatio) + marginRatio / 2
    const normalizedY1 = Number(source.y) * (1 - marginRatio) + marginRatio / 2
    const normalizedX2 = Number(target.x) * (1 - marginRatio) + marginRatio / 2
    const normalizedY2 = Number(target.y) * (1 - marginRatio) + marginRatio / 2
    edges.push({
      normalizedX1,
      normalizedY1,
      normalizedX2,
      normalizedY2,
      key: `edge_${idx}`,
      strokeOpacity: 0.3,
      stroke: 'gray',
      data: edgeDatum
    })
  })
  return {edges}
}

export const networkDataFormatter = () => {
  return new Promise((resolve) => {
    cacheLoader.getCsvFileFromFirebaseStorage('nodes.csv').then((nodeData) => {
      const {nodes, texts} = nodeDataFormatter(nodeData)
      cacheLoader.getCsvFileFromFirebaseStorage('edges.csv').then((edgeData) => {
        const {edges} = edgeDataFormatter({nodeData, edgeData})
        resolve({nodes, edges, texts, nodeData, edgeData})
      })
    })
  })
}
