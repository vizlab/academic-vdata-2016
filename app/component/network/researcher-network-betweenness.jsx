import React from 'react'
import {ResearcherNetworkBasic} from './researcher-network-basic'

import {networkCtrl} from './network-ctrl'

export class ResearcherNetworkBetweenness extends ResearcherNetworkBasic {
  constructor (props) {
    super(props)
    networkCtrl.setBetweennessMode()
  }

  afterDataLoad () {
    networkCtrl.getData()
  }
}

export class InteractiveResearcherNetworkBetweenness extends React.Component {
  render () {
    return (
      <div>
        <ResearcherNetworkBetweenness
          height={this.props.height}
          width={this.props.width}
          withTools
        />
      </div>
    )
  }
}
InteractiveResearcherNetworkBetweenness.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
}
