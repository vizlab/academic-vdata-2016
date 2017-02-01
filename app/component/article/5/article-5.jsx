import React from 'react'

import {Pagination} from '../pagination'

export class Article5 extends React.Component {
  render () {
    return (
      <div>
        article 5
        <a target='_blank' href='https://academic-vdata-2016.firebaseapp.com/contents/4/'>todo</a>
        <Pagination currentPage={5} />
      </div>
    )
  }
}
