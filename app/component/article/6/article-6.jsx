import React from 'react'

import {Pagination} from '../pagination'
import {title} from './contents'
import {ArticleHeader} from '../article-header'

export class Article6 extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>
              test
            </p>
          </div>
        </div>
        <Pagination currentPage={6} />
      </div>
    )
  }
}
