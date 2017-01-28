import React from 'react'

import {Article1Card} from './1/article-1-card'
import {Article2Card} from './2/article-2-card'
import {Article3Card} from './3/article-3-card'
import {Article4Card} from './4/article-4-card'
import {Article5Card} from './5/article-5-card'

export class ArticleHome extends React.Component {
  render () {
    return (
      <div>
        <div className='jumbotron'>
          <div className='container'>
            <h1>
              学術分野の文化比較大調査 中間発表
            </h1>
            <p>
              「学術分野ごとの文化比較大調査」は現在も回答受付中ですが（2017年1月時点で目標の1割しか集まっていません。何卒ご協力を！）、このサイトでは、調査から得られる分析結果の途中経過を紹介します！
            </p>
            <p>
              「こんなおもしろい結果、見たことない！」 「ぜひ、うちの研究会で紹介したい！」 「私のチームと共同研究したい！」等の方がおられましたら、
              <a target='_blank' href='http://www.cpier.kyoto-u.ac.jp/inquiry/'>問い合わせフォーム</a>
              よりぜひコンタクトください！ みなさまの協力により本調査の完成度をたかめ、より正しく我が国の学術ネットーワークを表現しましょう！
            </p>
          </div>
        </div>
        <div className='container'>
          <div className='col-md-6'>
            <Article1Card />
          </div>
          <div className='col-md-6'>
            <Article2Card />
          </div>
          <div className='col-md-6'>
            <Article3Card />
          </div>
          <div className='col-md-6'>
            <Article4Card />
          </div>
          <div className='col-md-6'>
            <Article5Card />
          </div>
        </div>
      </div>
    )
  }
}
