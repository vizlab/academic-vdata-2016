import React from 'react'

import {cacheLoader} from '../../../service/cache-loader'
import {c40} from '../../../constants'

export class ResearchersTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      researchers: []
    }
  }

  componentWillMount () {
    cacheLoader.getCsvFileFromFirebaseStorage('nodes.csv')
      .then((nodes) => {
        nodes
          .map(node => Object.assign(node, {'betweenness_centrality': Number(node['betweenness_centrality'])}))
        nodes.sort((a, b) => {
          if (a['betweenness_centrality'] > b['betweenness_centrality']) return -1
          if (a['betweenness_centrality'] < b['betweenness_centrality']) return 1
          return 0
        })
        this.setState({
          researchers: nodes.splice(0, 100)
        })
      })
  }

  render () {
    return (
      <table className='table table-sm table-hover' style={{'textAlign': 'left'}}>
        <thead>
          <tr>
            <th>順位</th>
            <th>グループ</th>
            <th>研究キーワード１</th>
            <th>研究キーワード２</th>
            <th>研究キーワード３</th>
            <th>研究キーワード４</th>
            <th>研究キーワード５</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.researchers.map((node, idx) => {
              return (
                <tr key={idx}>
                  <td scope='row'>{idx + 1}</td>
                  <td style={{'color': c40[Number(node['Modularity Class'])]}}>●</td>
                  <td>{node.keyword_1}</td>
                  <td>{node.keyword_2}</td>
                  <td>{node.keyword_3}</td>
                  <td>{node.keyword_4}</td>
                  <td>{node.keyword_5}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}
