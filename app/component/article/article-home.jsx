import React from 'react'

import {Footer} from '../footer/footer'
import {Article1Card} from './1/article-1-card'
import {Article2Card} from './2/article-2-card'
// import {Article3Card} from './3/article-3-card'
// import {Article4Card} from './4/article-4-card'
// import {Article5Card} from './5/article-5-card'

import {ArticleHeader} from './article-header'

export class ArticleHome extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <Article1Card />
            </div>
            <div className='col-md-6'>
              <Article2Card />
            </div>

          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
//
// <div className='col-md-6'>
//   <Article3Card />
// </div>
// <div className='col-md-6'>
//   <Article4Card />
//   </div>
//   <div className='col-md-6'>
//   <Article5Card />
//   </div>
