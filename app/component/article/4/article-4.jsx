import React from 'react'

import {title} from './contents'
import {ArticleHeader} from '../article-header'
import {Pagination} from '../pagination'

export class Article4
extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>作成中</p>
          </div>
        </div>
        <Pagination currentPage={4} />
      </div>
    )
  }
}
