import React from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'

import {ReactNetworkBasic} from './researcher-network-basic'
import {Footer} from '../../footer/footer'
import {ArticleHeader} from '../article-header'

export class Article2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isContentExpand: false
    }
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
            <Paper style={{'position': 'relative'}}>
              <IconButton style={{'position': 'absolute', 'top': '1rem', 'right': '1rem'}} tooltip='expand'>
                <ActionOpenInNew onClick={() => { this.toggleContentExpand() }} />
              </IconButton>
              <ReactNetworkBasic />
            </Paper>
          </div>
          <Footer />
        </div>

        <div style={{'visibility': this.state.isContentExpand ? '' : 'hidden', 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%', 'height': '100%', 'backgroundColor': 'white'}}>
          <IconButton style={{'position': 'absolute', 'top': '1rem', 'left': '1rem'}} tooltip='expand'>
            <NavigationArrowBack onClick={() => { this.toggleContentExpand() }} />
          </IconButton>
          <ReactNetworkBasic />
        </div>
      </div>
    )
  }
}
