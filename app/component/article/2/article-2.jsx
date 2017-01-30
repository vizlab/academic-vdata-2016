import React from 'react'

import {ReactNetworkBasic} from './researcher-network-basic'

import {ArticleHeader} from '../article-header'

export class Article2 extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <ReactNetworkBasic width={400} height={400} />
      </div>
    )
  }
}
