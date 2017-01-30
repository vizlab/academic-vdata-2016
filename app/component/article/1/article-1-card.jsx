import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article1Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/article-1-preview.png'
      text='学術分野によって異なる文化を明らかにする「学術分野の文化比較大調査」．どんな研究者から回答を得られたのか．'
      articlePath='/articles/1'
    />
  )
}
