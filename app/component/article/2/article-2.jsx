import React from 'react'
import Paper from 'material-ui/Paper'
import ReactDOM from 'react-dom'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'

import {ResearcherNetworkBasic} from './researcher-network-basic'
import {Footer} from '../../footer/footer'
import {ArticleHeader} from '../article-header'

export class Article2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isContentExpand: false,
      contentHeight: 0,
      contentWidth: 0,
      expandContentHeight: 0,
      expandContentWidth: 0
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
      const contentWidth = ReactDOM.findDOMNode(this.refs.articleContent1).getBoundingClientRect().width | 0
      const expandContentHeight = window.innerHeight - 100 | 0
      const expandContentWidth = window.innerWidth | 0
      this.setState({
        contentHeight,
        contentWidth,
        expandContentHeight,
        expandContentWidth
      })
    }, 0)
  }

  toggleContentExpand () {
    this.setState({isContentExpand: !this.state.isContentExpand})
  }

  render () {
    return (
      <div>
        <div style={{'visibility': this.state.isContentExpand ? 'hidden' : ''}}>
          <ArticleHeader />
          <div className='container'>
            <Paper style={{'position': 'relative', 'height': this.state.contentHeight}}>
              <IconButton style={{'position': 'absolute', 'top': '1rem', 'right': '1rem'}} tooltip='expand'>
                <ActionOpenInNew onClick={() => { this.toggleContentExpand() }} />
              </IconButton>
              <ResearcherNetworkBasic ref='articleContent1' height={this.state.contentHeight} width={this.state.contentWidth} />
            </Paper>
          </div>
          <Footer />
        </div>

        <div style={{'visibility': this.state.isContentExpand ? '' : 'hidden', 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%', 'height': '100%', 'backgroundColor': 'white'}}>
          <IconButton style={{'position': 'absolute', 'top': '1rem', 'left': '1rem'}} tooltip='expand'>
            <NavigationArrowBack onClick={() => { this.toggleContentExpand() }} />
          </IconButton>
          <ResearcherNetworkBasic height={this.state.expandContentHeight} width={this.state.expandContentWidth} />
        </div>
      </div>
    )
  }
}
