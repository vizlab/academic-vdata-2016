import React from 'react'
import {ResearcherCard} from '../researcher/researcher-card'
import AutoComplete from 'material-ui/AutoComplete'
import {networkCtrl} from '../network/network-ctrl'

class ResearchersViewerCtrl {
  constructor () {
    this.researchers = []
    this.listeners = []
  }

  init () {
    this.researchers = []
    this.listeners = []
  }

  appendResearcher (researcher) {
    this.researchers.push(researcher)
    this.complete()
  }

  setResearchers (researchers) {
    this.researchers = researchers
    this.complete()
  }

  complete () {
    this.listeners.forEach((listener) => { listener() })
  }

  register (cb) {
    this.listeners.push(() => { cb(this.researchers) })
  }
}

export const researchersViewerCtrl = new ResearchersViewerCtrl()

export class ResearchersViewer extends React.Component {
  constructor (props) {
    super(props)
    researchersViewerCtrl.init()
    this.state = {
      researchers: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    networkCtrl.register(() => {
      this.setState({
        isLoaded: networkCtrl.isLoaded
      })
    })
    researchersViewerCtrl.register((researchers) => {
      this.setState({researchers})
    })
  }

  componentWillUnmount () {
    networkCtrl.dispose()
    researchersViewerCtrl.init()
  }

  render () {
    return this.state.isLoaded
        ? (
          <div>
            <AutoComplete
              style={{'backgroundColor': 'white'}}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={networkCtrl.getAllResearchKeyword()}
              hintText='研究キーワード検索'
              onUpdateInput={(v) => { networkCtrl.searchByKeyword(v) }}
            />
            <div style={{'maxHeight': this.props.height * 0.8, 'overflowY': 'scroll'}}>
              <ResearcherCard
                data={this.state.researchers}
              />
            </div>
          </div>
        )
        : null
  }
}
ResearchersViewer.propTypes = {
  height: React.PropTypes.number
}
