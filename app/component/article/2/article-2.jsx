import React from 'react'
import Paper from 'material-ui/Paper'

import {ReactNetworkBasic} from './researcher-network-basic'

import {ArticleHeader} from '../article-header'

export class Article2 extends React.Component {
  render () {
    return (
      <div ref='article2'>
        <ArticleHeader />
        <div className='container'>
          <Paper>
            <ReactNetworkBasic />
          </Paper>
        </div>
      </div>
    )
  }
}
