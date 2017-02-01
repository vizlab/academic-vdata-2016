import React from 'react'

import {Pagination} from '../pagination'

export class Article3 extends React.Component {
  render () {
    return (
      <div>
        article 3
        <a target='_blank' href='https://academic-vdata-2016.firebaseapp.com/contents/3/'>todo</a>
        <Pagination currentPage={3} />
      </div>
    )
  }
}
