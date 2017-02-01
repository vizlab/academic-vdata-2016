import React from 'react'
import {
  CardTitle,
  CardText
} from 'material-ui/Card'
import Paper from 'material-ui/Paper'

import {title} from './contents'
import {FirebaseImg} from '../../utils/firebase-img'
import {ArticleHeader} from '../article-header'
import {Pagination} from '../pagination'

export class Article1 extends React.Component {
  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container'>
          <h2>{title}</h2>
          <p>我が国に在籍する研究者1670名の分析（2016/8/1時）</p>
          <Paper style={{'marginTop': '24px', 'marginBottom': '24px', 'padding': '12px'}}>
            <div className='container row'>
              <div className='col-md-6'>
                <CardTitle title='男女比' />
                <CardText>
                  2013年の我が国の研究者割合は男性85.6%,女性14.4%となっている(参考)．
                </CardText>
              </div>
              <div className='col-md-6 text-center' style={{'paddingTop': '24px', 'paddingBottom': '24px'}}>
                <FirebaseImg src='svg/gender-ratio.svg' imgStyle={{'width': '80%'}} />
              </div>
            </div>
          </Paper>

          <Paper style={{'marginTop': '24px', 'marginBottom': '24px', 'padding': '12px'}}>
            <div className='container row'>
              <div className='col-md-6'>
                <CardTitle title='年齢比' />
                <CardText>若い研究者から得られた回答は少なかったように思われる．</CardText>
              </div>
              <div className='col-md-6 text-center' style={{'paddingTop': '24px', 'paddingBottom': '24px'}}>
                <FirebaseImg src='svg/age-ratio.svg' imgStyle={{'width': '80%'}} />
              </div>
            </div>
          </Paper>

          <Paper style={{'marginTop': '24px', 'marginBottom': '24px', 'padding': '12px'}}>
            <div className='container row'>
              <div className='col-md-6'>
                <CardTitle title='所属研究機関' />
                <CardText>私立大学に属している研究者からの回答は少なかったように思われる．</CardText>
              </div>
              <div className='col-md-6 text-center' style={{'paddingTop': '24px', 'paddingBottom': '24px'}}>
                <FirebaseImg src='svg/org-ratio.svg' imgStyle={{'width': '80%'}} />
              </div>
            </div>
          </Paper>

          <Paper style={{'marginTop': '24px', 'marginBottom': '24px', 'padding': '12px'}}>
            <div className='container row'>
              <div className='col-md-3'>
                <CardTitle title='研究分野分布' />
                <CardText>
                  本アンケートで集まった細目番号で区分される分野別の研究者数である．
                  より詳しい分布はここから見ることができる．
                </CardText>
              </div>
              <div className='col-md-9 text-center' style={{'paddingTop': '24px', 'paddingBottom': '24px'}}>
                <FirebaseImg src='svg/bunya.svg' imgStyle={{'width': '90%'}} />
              </div>
            </div>
          </Paper>

          <Paper style={{'marginTop': '24px', 'marginBottom': '24px'}}>
            <div className='container'>
              <CardTitle title='研究キーワード' />
              <CardText>
                研究者が掲げる研究キーワードが多いものほど大きく描画したワードクラウドである．
                詳しいキーワードから，大雑把なキーワードまで様々なものが挙げられている．
              </CardText>
              <div className='text-center' style={{'paddingTop': '24px', 'paddingBottom': '24px'}}>
                <FirebaseImg src='svg/keywordcloud.svg' imgStyle={{'width': '90%'}} />
              </div>
            </div>
          </Paper>
          <Pagination currentPage={1} />
          <div className='text-center'>
            <a href='/articles'>- home -</a>
          </div>
        </div>
      </div>
    )
  }
}
