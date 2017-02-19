import React from 'react'
import {ResearcherCard} from '../researcher/researcher-card'

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
      researchers: []
    }
  }

  componentDidMount () {
    researchersViewerCtrl.register((researchers) => {
      this.setState({researchers})
    })
  }

  componentWillUnmount () {
    researchersViewerCtrl.init()
  }

  render () {
    return (
      <div style={{'maxHeight': this.props.height * 0.8, 'overflowY': 'scroll'}}>
        <ResearcherCard
          data={this.state.researchers}
        />
      </div>
    )
  }
}
ResearchersViewer.propTypes = {
  height: React.PropTypes.number
}
