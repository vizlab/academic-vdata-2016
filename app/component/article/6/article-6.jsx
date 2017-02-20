import React from 'react'

import {Pagination} from '../pagination'
import {title} from './contents'
import {ArticleHeader} from '../article-header'
import {cacheLoader} from '../../../service/cache-loader'
import {SaimokuAnalysis} from './saimoku-analysis'
import {saimokus} from '../../../constants'

export class Article6 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount () {
    cacheLoader.getJsonFileFromFirebaseStorage('saimoku_analysis.json').then((d) => {
      const data = []
      const bunkas = []
      saimokus.forEach((saimoku) => {
        saimoku.subclasses.forEach((d) => {
          bunkas.push(d.subclass)
        })
      })
      Object.keys(d).map((bunka) => {
        d[bunka]['bunka'] = bunka
        data[bunkas.indexOf(bunka)] = d[bunka]
      })
      this.setState({data, bunkas})
    })
  }

  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>一般的に，細目番号は学術分野を分類するものではない．しかし，身近にある細目番号はわかりやすい分類方法ではある．</p>
            <p>アンケートデータを細目番号の分類を元に分析する．</p>
          </div>
          <SaimokuAnalysis
            data={this.state.data}
          />
        </div>
        <Pagination currentPage={6} />
      </div>
    )
  }
}
