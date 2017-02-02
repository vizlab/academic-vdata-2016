import React from 'react'

export class ArticleHeader extends React.Component {
  render () {
    return <div className='jumbotron'>
      <div className='container'>
        <h1>
          学術分野の文化比較大調査 中間発表
        </h1>
        <hr />
        <p>
          「学術分野ごとの文化比較大調査」は現在も回答受付中ですが（2017年1月時点で目標の1割しか集まっていません．何卒ご協力を！），このサイトでは，調査から得られる分析結果の途中経過を紹介します！
        </p>
        <p>
          「こんなおもしろい結果，見たことない！」 「ぜひ，うちの研究会で紹介したい！」 「私のチームと共同研究したい！」等の方がおられましたら，
          <a target='_blank' href='http://www.cpier.kyoto-u.ac.jp/inquiry/'>問い合わせフォーム</a>
          よりぜひコンタクトください！ みなさまの協力により本調査の完成度をたかめ，より正しく我が国の学術ネットーワークを表現しましょう！
        </p>
      </div>
    </div>
  }
}
