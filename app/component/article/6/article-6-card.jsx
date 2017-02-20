import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article6Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/article-6-preview.png'
      text='一般的に，細目番号は学術分野を分類するものではない．しかし，身近にある細目番号はわかりやすい分類方法ではある．'
      articlePath='/articles/6'
    />
  )
}
