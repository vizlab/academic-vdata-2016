import React from 'react'
import {Link} from 'react-router'
import Paper from 'material-ui/Paper'
import ReactDOM from 'react-dom'
import IconButton from 'material-ui/IconButton'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'

import {ResearcherNetworkBasic} from '../../network/researcher-network-basic'
import {ArticleHeader} from '../article-header'
import {title} from './contents'
import {Pagination} from '../pagination'

export class Article2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contentHeight: 0,
      contentWidth: 0
    }
  }

  componentWillMount () {
    this.updateRectSize()
    window.addEventListener('resize', this.updateRectSize.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateRectSize)
  }

  updateRectSize () {
    setTimeout(() => {
      const contentHeight = window.innerHeight * 0.8 | 0
      const contentWidth = ReactDOM.findDOMNode(this.refs.articleContent2).getBoundingClientRect().width | 0
      this.setState({
        contentHeight,
        contentWidth
      })
    }, 0)
  }

  render () {
    return (
      <div>
        <ArticleHeader />
        <div className='container text-center'>
          <div className='mb-5'>
            <h2>{title}</h2>
            <p>
              学術分野の文化比較大調査では研究者に自分の取り組む研究キーワードを5つまで答えてもらっている．<br />
              これを頼りに研究者ネットワークを構築する．
            </p>
          </div>
          <h3 className='mb-3'>ネットワークの作り方から紹介する</h3>
          <h4>2モードネットワーク</h4>
          <p>
            ネットワーク構造のサンプル．丸を研究者とし，研究者が同じ研究キーワードを挙げるとリンクで結ばれる．<br />
            一般にこのようなネットワークを2モードネットワークという．
          </p>
          <Paper className='mx-auto mb-5' style={{'width': '280px', 'height': '250px'}}>
            <img src='/assets/img/example-2mode.svg' />
          </Paper>
          <h4>コミュニティ検出</h4>
          <p>
            コミュニティ検出のサンプル． ネットワークから<a href='https://ja.wikipedia.org/wiki/モジュラリティ' target='_blank'>モジュラリティ</a>を計算し，コミュニティ検出を行う．<br />
            同じ色の丸は同じコミュニティに属することを示している．
          </p>
          <Paper className='mx-auto mb-5' style={{'width': '280px', 'height': '250px'}}>
            <img src='/assets/img/example-community.svg' />
          </Paper>
          <h4>ネットワーク可視化</h4>
          <p>
            2モードネットワーク，モジュラリティを踏まえた上でネットワークとして可視化する．<br />
            丸に付属するテキストは，その研究者が一番にあげた研究キーワードである．
          </p>
          <Paper className='mx-auto mb-5' style={{'width': '280px', 'height': '250px'}}>
            <img src='/assets/img/example-network.svg' />
          </Paper>
          <h3 className='mb-3'>アンケートから生成された研究者ネットワークがこれだ!!</h3>
          <Paper style={{'position': 'relative', 'height': this.state.contentHeight}} ref='articleContent2'>
            <Link to={{'pathname': '/network-viewer', 'query': {'type': 'basic'}}}>
              <IconButton style={{'position': 'absolute', 'top': '1rem', 'right': '1rem'}} tooltip='expand'>
                <ActionOpenInNew />
              </IconButton>
            </Link>
            <ResearcherNetworkBasic
              height={this.state.contentHeight}
              width={this.state.contentWidth}
            />
          </Paper>
          <Pagination currentPage={2} />
        </div>
      </div>
    )
  }
}
