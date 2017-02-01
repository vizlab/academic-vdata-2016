import React from 'react'

import {Pagination} from '../pagination'

export class Article4
extends React.Component {
  render () {
    return (
      <div>
        article 4
        <Pagination currentPage={4} />
      </div>
    )
  }
}
