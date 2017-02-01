import React from 'react'

import {articleAmount} from './articles'

export class Pagination extends React.Component {
  render () {
    const pages = []
    for (let i = 1; i <= articleAmount; i++) {
      pages.push(i)
    }
    return (
      <nav className='m-5'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${this.props.currentPage === 1 ? 'disabled' : ''}`}>
            <a className='page-link' href='#'>Previous</a>
          </li>
          {
            pages
              .map((num) => {
                return this.props.currentPage === num
                  ? (
                    <li key={num} className='page-item active disabled'>
                      <a className='page-link'>
                        {num}
                        <span className='sr-only'>(current)</span>
                      </a>
                    </li>
                  )
                  : (
                    <li key={num} className='page-item'>
                      <a className='page-link' href={`/articles/${num}`}>{num}</a>
                    </li>
                  )
              })
          }
          <li className={`page-item ${this.props.currentPage === articleAmount ? 'disabled' : ''}`}>
            <a className='page-link' href='#'>Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}
Pagination.propTypes = {
  currentPage: React.PropTypes.number
}
