import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import {saimokus, questionRankColors, questionGradual, questionItems} from '../../../constants'

const bunkaIndicator = [
  'チームワーク',
  'ロジカル',
  'ドライ',
  'インターディシプリナリー',
  'フレンドシップ',
  'ペーパードリブン',
  'サイエンティフィック',
  'エンジニアリング',
  'リーディング'
]

const styles = {
  chip: {
    margin: 4,
    cursor: 'pointer'
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const bunkas = []
saimokus.forEach((saimoku) => {
  saimoku.subclasses.forEach((d) => {
    bunkas.push(d.subclass)
  })
})

export class SaimokuAnalysis extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      key: 'A01',
      bunkas: new Set(bunkas)
    }
  }

  handleChange (v) {
    this.setState({
      key: v
    })
  }

  render () {
    return this.props.data ? (
      <div className='text-left'>
        <div
          className='mb-5'
        >
          <SelectField
            fullWidth
            value={this.state.key}
            onChange={(e, i, v) => { this.handleChange(v) }}
            floatingLabelText='質問項目をクリックすれば、他の質問の回答結果が見られます'
            className='p-1'
          >
            {
              Object.keys(questionItems).map((key) => {
                return (
                  <MenuItem
                    key={key}
                    value={key}
                    primaryText={questionItems[key]}
                  />
                )
              })
            }
          </SelectField>
          <div style={styles.chipWrapper}>
            {
              this.props.data.map((datum, idx) => {
                return (
                  <span
                    style={styles.chip}
                    className={`badge ${this.state.bunkas.has(datum.bunka) ? 'badge-primary' : 'badge-default'}`}
                    key={idx}
                    onClick={() => {
                      if (this.state.bunkas.has(datum.bunka)) {
                        this.state.bunkas.delete(datum.bunka)
                      } else {
                        this.state.bunkas.add(datum.bunka)
                      }
                      this.setState({
                        bunkas: this.state.bunkas
                      })
                    }}
                  >
                    {datum.bunka}
                  </span>
                )
              })
            }
          </div>
          <div>
            <button
              className='btn btn-outline-secondary p-1 btn-sm'
              onClick={() => {
                this.setState({
                  bunkas: new Set(bunkas)
                })
              }}
            >
              Select All
            </button>
            <button
              className='btn btn-outline-secondary p-1 btn-sm'
              onClick={() => {
                this.setState({
                  bunkas: new Set()
                })
              }}
            >
              Remove All
            </button>
          </div>
        </div>
        {
          this.props.data.map((datum, idx) => {
            if (!this.state.bunkas.has(datum.bunka)) return
            return (
              <div key={idx}>
                <h3>{datum['bunka']}</h3>
                <span>回答者：{datum.A01.reduce((pre, cur) => pre + cur)}名</span>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='p-1'>
                      {
                        Object.keys(datum.keywords).map((key, idx) => {
                          let amount = datum.keywords[key]
                          return (
                            <span
                              className='badge badge-pill badge-default'
                              key={idx}
                            >
                              {key}
                              {amount !== 1 ? `: ${amount}` : ''}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='p-3'>
                      <h5>
                        {questionItems[this.state.key]}
                      </h5>
                      {
                        datum[this.state.key]
                          .slice()
                          .reverse()
                          .map((amount, idx) => {
                            return (
                              <p key={idx}>
                                {
                                  [...Array(amount).keys()].map((i) => {
                                    return (
                                      <span style={{'color': questionRankColors.slice().reverse()[idx]}} key={i}>
                                        ●
                                      </span>
                                    )
                                  })
                                }
                                ({questionGradual.slice().reverse()[idx]})
                                : {amount}人
                              </p>
                            )
                          })
                      }
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='p-3'>
                      <h5>文化指標値</h5>
                      {
                        bunkaIndicator.map((label, idx) => {
                          return (
                            <div className='row' key={idx}>
                              <div className='col-sm-6'>{label}</div>
                              <div className='col-sm-6'>
                                {
                                  Math.round(datum.standard_bunka_components[idx] * 10)
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            )
          })
        }
      </div>
      )
      : null
  }
}
SaimokuAnalysis.propTypes = {
  data: React.PropTypes.array,
  bunkas: React.PropTypes.array
}
