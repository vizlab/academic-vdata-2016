import React from 'react'
import Paper from 'material-ui/Paper'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import IconButton from 'material-ui/IconButton'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'

import {title} from './contents'
import {ArticleHeader} from '../article-header'
import {Pagination} from '../pagination'
import {ResearcherNetworkQuestion} from '../../network/researcher-network-question'

export class Article4 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contentHeight: 0,
      contentWidth: 0
    }
  }

  componentWillMount () {
    this.updateRectSize()
    window.addEventListener('resize', this.updateRectSize.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateRectSize)
  }

  updateRectSize () {
    setTimeout(() => {
      const contentHeight = window.innerHeight * 0.8 | 0
      const contentWidth = ReactDOM.findDOMNode(this.refs.articleContent4).getBoundingClientRect().width | 0
      this.setState({
        contentHeight,
        contentWidth
      })
    }, 0)
  }

  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>TODO: 特定の質問項目で色を変えると何か発見できるだろうか</p>
            <Paper className='mb-5' style={{'position': 'relative', 'height': this.state.contentHeight}} ref='articleContent4'>
              <Link to={{'pathname': '/network-viewer', 'query': {'type': 'question'}}}>
                <IconButton style={{'position': 'absolute', 'top': '1rem', 'right': '1rem'}} tooltip='expand'>
                  <ActionOpenInNew />
                </IconButton>
              </Link>
              <ResearcherNetworkQuestion
                height={this.state.contentHeight}
                width={this.state.contentWidth}
                questionId='A01'
              />
            </Paper>
          </div>
        </div>
        <Pagination currentPage={4} />
      </div>
    )
  }
}
