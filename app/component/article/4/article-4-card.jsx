import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article4Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/login.png'
      text='例えば、「研究の主たる成果は論文よりも著書のほうが価値がある」という回答に同意か否かの回答を研究者ネットワークMAPに重ねる。これにより、研究分野ごとの文化的特性が詳らかに！'
      articlePath='/articles/4'
    />
  )
}
