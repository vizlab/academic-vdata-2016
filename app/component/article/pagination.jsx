import React from 'react'
import {Link} from 'react-router'

import {articleAmount} from './article-home'

export class Pagination extends React.Component {
  render () {
    const pages = []
    for (let i = 1; i <= articleAmount; i++) {
      pages.push(i)
    }
    return (
      <div>
        <nav className='m-5'>
          <ul className='pagination justify-content-center'>
            <li className={`page-item ${this.props.currentPage === 1 ? 'disabled' : ''}`}>
              <Link className='page-link' to={`/articles/${this.props.currentPage - 1}`}>Previous</Link>
            </li>
            {
              pages
                .map((num) => {
                  return this.props.currentPage === num
                    ? (
                      <li key={num} className='page-item active disabled'>
                        <Link className='page-link' to={`/articles/${num}`}>
                          {num}
                          <span className='sr-only'>(current)</span>
                        </Link>
                      </li>
                    )
                    : (
                      <li key={num} className='page-item'>
                        <Link className='page-link' to={`/articles/${num}`}>
                          {num}
                        </Link>
                      </li>
                    )
                })
            }
            <li className={`page-item ${this.props.currentPage === articleAmount ? 'disabled' : ''}`}>
              <Link className='page-link' to={`/articles/${this.props.currentPage + 1}`}>Next</Link>
            </li>
          </ul>
        </nav>
        <div className='text-center'>
          <Link to='/articles'>- home -</Link>
        </div>
      </div>
    )
  }
}
Pagination.propTypes = {
  currentPage: React.PropTypes.number
}
