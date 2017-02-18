import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import {ResearcherNetworkBasic} from './researcher-network-basic'
import {questionRankColors, questionItems, questionGradual} from '../../constants'
import {networkCtrl} from './network-ctrl'

export class ResearcherNetworkQuestion extends ResearcherNetworkBasic {
  constructor (props) {
    super(props)
    networkCtrl.setQuestionMode()
  }

  componentWillReceiveProps (nextProps) {
    networkCtrl.setColorByQuestionId(nextProps.questionId)
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
        <ResearcherNetworkQuestion
          width={this.props.width}
          height={this.props.height}
          questionId={this.state.questionId}
          withTools
        />
        <div style={{'position': 'absolute', 'bottom': 80, 'left': 30}}>
          {
            questionRankColors
              .slice()
              .reverse()
              .map((color, idx) =>
                <div key={idx}>
                  <span style={{color}}>●</span>
                  : {questionGradual.slice().reverse()[idx]}
                </div>
              )
          }
        </div>
        <div style={{'position': 'absolute', 'right': 0, 'bottom': 10, 'width': this.props.width - 300}}>
          <SelectField
            fullWidth
            floatingLabelText='質問項目をクリックすれば、他の質問の回答結果が見られます'
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
