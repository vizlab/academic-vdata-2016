import React from 'react'

import {Article1} from './1/article-1'
import {Article2} from './2/article-2'
import {Article3} from './3/article-3'
import {Article4} from './4/article-4'
import {Article5} from './5/article-5'
import {Article6} from './6/article-6'

export class Articles extends React.Component {
  getArticleById () {
    if (this.props.params.id === '1') return <Article1 />
    if (this.props.params.id === '2') return <Article2 />
    if (this.props.params.id === '3') return <Article3 />
    if (this.props.params.id === '4') return <Article4 />
    if (this.props.params.id === '5') return <Article5 />
    if (this.props.params.id === '6') return <Article6 />
    return <div>no article</div>
  }

  render () {
    return this.getArticleById()
  }
}
Articles.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string
  })
}
