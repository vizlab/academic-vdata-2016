import React from 'react'

export class Loading extends React.Component {
  render () {
    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        <div style={{
          'display': 'flex',
          'justifyContent': 'center',
          'alignItems': 'center',
          'padding': '36px'
        }}>
          loading
        </div>
      </div>
    )
  }
}
