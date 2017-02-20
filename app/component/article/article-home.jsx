import React from 'react'

import {Article1Card} from './1/article-1-card'
import {Article2Card} from './2/article-2-card'
import {Article3Card} from './3/article-3-card'
import {Article4Card} from './4/article-4-card'
import {Article5Card} from './5/article-5-card'
import {Article6Card} from './6/article-6-card'

import {ArticleHeader} from './article-header'

const articles = [
  <Article1Card />,
  <Article2Card />,
  <Article3Card />,
  <Article4Card />,
  <Article5Card />,
  <Article6Card />
]

export const articleAmount = articles.length

export class ArticleHome extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container'>
          <div className='row'>
            {
              articles.map((article, idx) => <div key={idx} className='col-md-6'>{article}</div>)
            }
          </div>
        </div>
      </div>
    )
  }
}
