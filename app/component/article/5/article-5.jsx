import React from 'react'
import Paper from 'material-ui/Paper'

import {Pagination} from '../pagination'
import {title} from './contents'
import {ArticleHeader} from '../article-header'
import {FirebaseImg} from '../../utils/firebase-img'

export class Article5 extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>
              100の質問の回答を主成分分析により9つの評価軸に再構築
              {/* （各軸の詳細は本ページ下部の表を参照）．<br /> */}
              {/* それを九角形のレーダーチャートにして22の研究者コミュニティに適応させ、下記Mapに重ねて表示した． */}
            </p>
          </div>
          {/* <h3 className='mb-3'>研究者ネットワーク</h3> */}
          <h3 className='mb-3'>コミュニティ別，文化可視化</h3>
          {
            [...Array(22).keys()].map((idx) => {
              return (
                <Paper key={idx} className='mb-5 p-4'>
                  <h4>Community No.{idx + 1}</h4>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-6' style={{'margin': 'auto'}}>
                        <FirebaseImg src={`/community_feature/${idx}_radar.png`} />
                      </div>
                      <div className='col-6' >
                        <FirebaseImg src={`/community_feature/${idx}_wordcloud.png`} />
                      </div>
                    </div>
                  </div>
                </Paper>
              )
            })
          }
        </div>
        <Pagination currentPage={5} />
      </div>
    )
  }
}
