import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article2Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/article-2-preview.png'
      text='各研究者の「研究キーワード」を結びつけてネットワーク図をつくるとどうなるか？　新たな学術分野の再定義に挑む！（現在、既存の学術界は、20の研究コミュニティーに分類可能との結果がでています！）'
      articlePath='/articles/2'
    />
  )
}
