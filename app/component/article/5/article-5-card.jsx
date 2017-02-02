import React from 'react'

import {ArticleCard} from '../article-card'
import {title} from './contents'

export const Article5Card = () => {
  return (
    <ArticleCard
      title={title}
      imgPath='/assets/img/article-5-preview.jpeg'
      text='本調査で回答いただいた100項目のアンケート結果から、研究の価値観や行動様式を分析して学術分野の文化を抽象化し見える化する！　意外な分野が相性がよい？'
      articlePath='/articles/5'
    />
  )
}
