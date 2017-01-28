import React from 'react'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {routerElem} from './routing'

const rootDOM = window.document.querySelector('ac-root')

const rootElem = (
  <MuiThemeProvider>
    {routerElem}
  </MuiThemeProvider>
)

render(rootElem, rootDOM)
