import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Person from 'material-ui/svg-icons/social/person'
import {c40} from '../../constants'
import {networkCtrl} from '../network/network-ctrl'

const styles = {
  chipWrap: {
    padding: 0,
    margin: 0
  },
  chip: {
    margin: 4,
    borderRadius: '8px'
  },
  chipLabel: {
    fontSize: '8px',
    paddingLeft: '4px',
    paddingRight: '4px',
    lineHeight: '20px'
  }
}

export class ResearcherCard extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.data.length
            ? <Paper zDepth={5} style={{'backgroundColor': 'rgba(255,255,255,0.8)'}}>
              <List>
                {
                  this.props.data.map((d) => {
                    return (
                      <ListItem
                        key={d.id}
                        primaryText={'id: ' + d.id}
                        disabled
                        secondaryText={
                          <p style={styles.chipWrap} className='row'>
                            {d.keyword_1 ? <span className='badge badge-pill badge-default' onClick={() => { networkCtrl.searchByKeyword(d.keyword_1) }}>{`${d.keyword_1}`}</span> : null}
                            {d.keyword_2 ? <span className='badge badge-pill badge-default' onClick={() => { networkCtrl.searchByKeyword(d.keyword_2) }}>{`${d.keyword_2}`}</span> : null}
                            {d.keyword_3 ? <span className='badge badge-pill badge-default' onClick={() => { networkCtrl.searchByKeyword(d.keyword_3) }}>{`${d.keyword_3}`}</span> : null}
                            {d.keyword_4 ? <span className='badge badge-pill badge-default' onClick={() => { networkCtrl.searchByKeyword(d.keyword_4) }}>{`${d.keyword_4}`}</span> : null}
                            {d.keyword_5 ? <span className='badge badge-pill badge-default' onClick={() => { networkCtrl.searchByKeyword(d.keyword_5) }}>{`${d.keyword_5}`}</span> : null}
                          </p>
                        }
                        leftAvatar={<Person color={c40[d['Modularity Class']]} />}
                      />
                    )
                  })
                }
              </List>
            </Paper>
            : null
        }
      </div>
    )
  }
}
ResearcherCard.propTypes = {
  data: React.PropTypes.array
}
