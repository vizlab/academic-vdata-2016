import React from 'react'
import Paper from 'material-ui/Paper'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import IconButton from 'material-ui/IconButton'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'

import {Pagination} from '../pagination'
import {ArticleHeader} from '../article-header'
import {title} from './contents'
import {ResearcherNetworkBetweenness} from '../../network/researcher-network-betweenness'
import {ResearchersTable} from './researchers-table'

export class Article3 extends React.Component {
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
      const contentWidth = ReactDOM.findDOMNode(this.refs.articleContent3).getBoundingClientRect().width | 0
      this.setState({
        contentHeight,
        contentWidth
      })
    }, 0)
  }

  toggleContentExpand () {
    this.setState({isContentExpand: !this.state.isContentExpand})
  }

  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>
              ハブとなる研究者を拡大して表示．<br />
              また，多くの研究者と研究キーワードが共通（関連）している研究者をキーパーソンとして，そのトップ100を下記テーブルに記載．
            </p>
          </div>
          <h3 className='mb-3'>注目すべき研究者</h3>
          <Paper className='mb-5' style={{'position': 'relative', 'height': this.state.contentHeight}} ref='articleContent3'>
            <Link to={{'pathname': '/network-viewer', 'query': {'type': 'betweenness'}}}>
              <IconButton style={{'position': 'absolute', 'top': '1rem', 'right': '1rem'}} tooltip='expand' onClick={() => { this.toggleContentExpand() }}>
                <ActionOpenInNew />
              </IconButton>
            </Link>
            <ResearcherNetworkBetweenness
              height={this.state.contentHeight}
              width={this.state.contentWidth}
            />
          </Paper>
          <h3 className='mb-3'>異分野連携のキーとなる研究者トップ100</h3>
          <Paper className='mb-5 p-5' style={{'height': '500px', 'overflowY': 'scroll'}}>
            <ResearchersTable />
          </Paper>
          <Pagination currentPage={3} />
        </div>
      </div>
    )
  }
}
