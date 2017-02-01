import React from 'react'

import {Pagination} from '../pagination'
import {ArticleHeader} from '../article-header'
import {Footer} from '../../footer/footer'

export class Article3 extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <Pagination currentPage={3} />
          <div>
            <a href='/articles'>- home -</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
