import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article3Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/article-3-preview.png'
      text='ネットワーク分析手法の一つである媒介中心性を用い，複数分野の媒介となる研究者（または研究分野）を分析．異分野連携のキーが可視化される！'
      articlePath='/articles/3'
    />
  )
}
