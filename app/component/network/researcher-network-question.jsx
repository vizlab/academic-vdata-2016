import React from 'react'

import {ResearcherNetworkBasic} from './researcher-network-basic'
import {questionRankColors} from '../../constants'

const getQuestionRankColors = (node, qId) => {
  return questionRankColors[Number(node.data[qId])]
}

export class ResearcherNetworkQuestion extends ResearcherNetworkBasic {
  afterDataLoad ({nodes, edges, texts}) {
    const questionColorNodes = nodes.map((node) => {
      return Object.assign(node, {
        'fill': getQuestionRankColors(node, this.props.questionId)
      })
    })
    this.setState({nodes: questionColorNodes, edges, texts})
  }

  componentWillReceiveProps () {
    const questionColorNodes = this.state.nodes.map((node) => {
      return Object.assign(node, {
        'fill': getQuestionRankColors(node, this.props.questionId)
      })
    })
    this.setState({nodes: questionColorNodes})
  }
}
ResearcherNetworkQuestion.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  questionId: React.PropTypes.string
}

export class InteractiveResearcherNetworkQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      question: "A01"
    }
  }
  componentDidMount () {
    // this.setState({
    //   question: "A02"
    // })
  }
  render () {
    return (
      <div>
        <ResearcherNetworkQuestion width={this.props.width} height={this.props.height} questionId={this.state.question} />
      </div>
    )
  }
}
ResearcherNetworkBasic.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
