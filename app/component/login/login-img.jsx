import React from 'react'

import {sympoURL, surveyURL} from '../../constants'

export class LoginImg extends React.Component {
  render () {
    return (
      <div>
        <div style={{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center',
          'backgroundImage': 'url(/assets/img/login.png)',
          'backgroundSize': 'cover',
          'backgroundRepeat': 'no-repeat',
          'position': 'relative',
          'height': '35rem',
          'minHeight': '35rem'
        }}>
          <div style={{'color': 'white', 'padding': '24px', 'fontSize': '24px'}}>
            <p style={{'textShadow': ' 5px  5px 10px black, -5px  5px 10px black, 5px -5px 10px black, -5px -5px 10px black'}}>
              アンケート調査のご回答は済ませましたでしょうか？
            </p>
            <p style={{'textShadow': ' 5px  5px 10px black, -5px  5px 10px black, 5px -5px 10px black, -5px -5px 10px black'}}>
              まだであれば「
              <a target='_blank' style={{'color': 'white', 'textDecoration': 'none'}} href={surveyURL}>ここ</a>
              」からアンケートへの回答をぜひ！
            </p>
            <p style={{'textShadow': ' 5px  5px 10px black, -5px  5px 10px black, 5px -5px 10px black, -5px -5px 10px black'}}>
              目標２万件の回答も、一人一人の回答から・・・<br />
              何卒ご協力をお願い申し上げます！
            </p>
            <p style={{'fontSize': '12px', 'textShadow': ' 3px  3px 6px black, -3px  3px 6px black, 3px -3px 6px black, -3px -3px 6px black'}}>
              ２万件集まれば、全ての生データを公開します<br />
              広く皆様のご研究や進路決定、分野の調査、政策決定などにご利用ください！<br />
              （もちろん個人情報は除く）
            </p>
          </div>
        </div>

        <div style={{'textAlign': 'right', 'padding': '12px'}}>
          <p>
          写真は、2016/12/16に東京にて開催した本調査に関する
          <a target='_blank' href={sympoURL}>シンポジウム</a>
          の様子
          </p>
        </div>
      </div>
    )
  }
}
