import React from 'react'
import TextField from 'material-ui/TextField'
import RaiseButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {loginFormController} from './login-form-controller'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  login (email, password) {
    loginFormController.login(email, password)
  }

  handleEmailChange (e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  render () {
    return (
      <Paper style={{'padding': '24px', 'margin': '24px'}}>
        <div className='text-center'>
          <h4>ログイン</h4>
        </div>
        <TextField
          hintText='メールアドレスを入力'
          floatingLabelText='メールアドレス'
          type='email'
          value={this.state.email}
          onChange={(e) => { this.handleEmailChange(e) }}
          style={{'width': '100%'}}
        />
        <br />
        <TextField
          hintText='パスワードを入力'
          floatingLabelText='パスワード'
          type='password'
          value={this.state.password}
          onChange={(e) => { this.handlePasswordChange(e) }}
          style={{'width': '100%'}}
        />
        <br />
        <div className='text-center'>
          <RaiseButton
            label='ログイン'
            primary
            onClick={() => this.login(this.state.email, this.state.password)}
            style={{'margin': '12px'}}
          />
        </div>
      </Paper>
    )
  }
}
