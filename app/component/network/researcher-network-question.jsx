import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import {ResearcherNetworkBasic} from './researcher-network-basic'
import {questionRankColors, questionItems} from '../../constants'

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

  componentWillReceiveProps (nextProps) {
    const questionColorNodes = this.state.nodes.map((node) => {
      return Object.assign(node, {
        'fill': getQuestionRankColors(node, nextProps.questionId)
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
      questionId: 'A01'
    }
  }

  handleChange (v) {
    this.setState({questionId: v})
  }

  render () {
    return (
      <div>
        <ResearcherNetworkQuestion width={this.props.width} height={this.props.height} questionId={this.state.questionId} />
        <div className='container'>
          <SelectField
            fullWidth
            value={this.state.questionId}
            onChange={(e, idx, v) => { this.handleChange(v) }}
          >
            {
              Object
                .keys(questionItems)
                .map((questionId) =>
                  <MenuItem
                    key={questionId}
                    value={questionId}
                    primaryText={questionItems[questionId]}
                  />
                )
            }
          </SelectField>
        </div>
      </div>
    )
  }
}
InteractiveResearcherNetworkQuestion.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}