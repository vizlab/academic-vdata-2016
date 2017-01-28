import ReactGA from 'react-ga'

import {googleAnalyticsId} from './constants'

ReactGA.initialize(googleAnalyticsId)

export const logPageView = () => {
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname)
}
