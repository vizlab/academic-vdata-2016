import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  Redirect
} from 'react-router'

import {logPageView} from './google-analytics'

import {LoginComponent} from './component/login/login'
import {RootComponent} from './component/root/root'
import {ArticleHome} from './component/article/article-home'
import {Articles} from './component/article/articles'
import {ArticleCtrl} from './component/article/article-ctrl'

export const routerElem = (
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path='/' component={RootComponent}>
      <IndexRedirect to='/login' />
      <Route path='login' component={LoginComponent} />
      <Route path='articles' component={ArticleCtrl} >
        <IndexRedirect to='/articles/home' />
        <Route path='/articles/home' component={ArticleHome} />
        <Route path='/articles/:id' component={Articles} />
      </Route>
      <Redirect from='*' to='/' />
    </Route>
  </Router>
)
