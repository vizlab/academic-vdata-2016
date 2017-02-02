import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaiseButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import {signupFormController} from './signup-controller'

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const validatePassword = (pass) => {
  return pass.length >= 6
}

export class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      'name': '',
      'department': '',
      'email': '',
      'password': '',
      'confirmPassword': '',
      'answeredQuestion': null,
      'permitSendMessage': null,
      'isValidName': true,
      'isValidDepartment': true,
      'isValidEmail': true,
      'isValidPassword': true,
      'isValidConfirmPassword': true,
      'isValidAnsweredQuestion': true,
      'isValidPermitSendMessage': true,
      'isSending': false
    }
  }

  handleNameChange (v) {
    this.setState({
      name: v,
      isValidName: !!v
    })
  }

  handleDepartmentChange (v) {
    this.setState({
      department: v,
      isValidDepartment: !!v
    })
  }

  handleEmailChange (v) {
    this.setState({
      email: v,
      isValidEmail: validateEmail(v)
    })
  }

  handlePasswordChange (v) {
    this.setState({
      password: v,
      isValidPassword: validatePassword(v)
    })
  }

  handleConfirmPasswordChange (v) {
    this.setState({
      confirmPassword: v,
      isValidConfirmPassword: this.state.password === v
    })
  }

  handleAnsweredQuestionChange (v) {
    this.setState({
      answeredQuestion: v,
      isValidAnsweredQuestion: v
    })
  }

  handlePermitSendMessageChange (v) {
    this.setState({
      permitSendMessage: v,
      isValidPermitSendMessage: v !== null
    })
  }

  signup ({email, password, name, department, permitSendMessage}) {
    this.setState({
      isSending: true
    })
    signupFormController.signup({email, password, name, department, permitSendMessage})
      .then(() => {
        this.setState({
          isSending: false
        })
      })
  }

  validAll () {
    return this.state.isValidName &&
      this.state.isValidDepartment &&
      this.state.isValidEmail &&
      this.state.isValidPassword &&
      this.state.isValidConfirmPassword &&
      this.state.isValidAnsweredQuestion &&
      this.state.isValidPermitSendMessage &&
      !!this.state.name &&
      !!this.state.department &&
      !!this.state.email &&
      !!this.state.password &&
      !!this.state.confirmPassword &&
      this.state.answeredQuestion &&
      this.state.permitSendMessage !== null
  }

  render () {
    return (
      <Paper style={{'padding': '24px', 'margin': '24px'}}>
        <div className='text-center'>
          <h4>新規登録</h4>
        </div>
        <p>登録頂いた方には、本アンケート調査に関わる情報（結果更新や新たな企画案内等）をお送りさせて頂きます。</p>
        <TextField
          hintText='氏名を入力'
          floatingLabelText='氏名（必須）'
          errorText={this.state.isValidName ? '' : '必須項目です'}
          type='text'
          value={this.state.name}
          onChange={(e) => { this.handleNameChange(e.target.value) }}
          fullWidth
        />
        <TextField
          hintText='所属を入力'
          floatingLabelText='所属（必須）'
          errorText={this.state.isValidDepartment ? '' : '必須項目です'}
          type='text'
          value={this.state.department}
          onChange={(e) => { this.handleDepartmentChange(e.target.value) }}
          fullWidth
        />
        <TextField
          hintText='メールアドレスを入力'
          floatingLabelText='メールアドレス（必須）'
          errorText={this.state.isValidEmail ? '' : '正しいメールアドレスを入力してください'}
          type='email'
          value={this.state.email}
          onChange={(e) => { this.handleEmailChange(e.target.value) }}
          fullWidth
        />
        <TextField
          hintText='パスワードを入力'
          floatingLabelText='パスワードを入力（必須）'
          errorText={this.state.isValidPassword ? '' : 'パスワードは6文字以上入力してください'}
          type='password'
          value={this.state.password}
          onChange={(e) => { this.handlePasswordChange(e.target.value) }}
          fullWidth
        />
        <TextField
          hintText='もう一度パスワードを入力'
          floatingLabelText='パスワードの確認'
          errorText={this.state.isValidConfirmPassword ? '' : 'パスワードが一致しません'}
          type='password'
          value={this.state.confirmPassword}
          onChange={(e) => { this.handleConfirmPasswordChange(e.target.value) }}
          fullWidth
        />
        <SelectField
          fullWidth
          errorText={this.state.isValidAnsweredQuestion ? '' : <a target='_blank' href='https://survey2015.symposium-hp.jp/apply.php'>アンケートへの回答をお願いします</a>}
          floatingLabelText='アンケートへの回答済みですか（必須）'
          floatingLabelFixed
          onChange={(e, i, v) => { this.handleAnsweredQuestionChange(v) }}
          value={this.state.answeredQuestion}
        >
          <MenuItem value={null} primaryText='' />
          <MenuItem value primaryText='Yes' />
          <MenuItem value={false} primaryText='No' />
        </SelectField>
        <SelectField
          fullWidth
          errorText={this.state.isValidPermitSendMessage ? '' : '必須項目です'}
          floatingLabelText='今後、このアンケート等に関する学際センターのイベント情報など、送っていいですか？（必須）'
          floatingLabelFixed
          onChange={(e, i, v) => { this.handlePermitSendMessageChange(v) }}
          value={this.state.permitSendMessage}
        >
          <MenuItem value={null} primaryText='' />
          <MenuItem value primaryText='Yes' />
          <MenuItem value={false} primaryText='No' />
        </SelectField>
        <div className='text-center'>
          <RaiseButton
            label={this.state.isSending ? '送信中' : '登録'}
            disabled={!this.validAll() || this.state.isSending}
            secondary
            onClick={() => this.signup(this.state)}
            style={{'margin': '12px'}}
          />
        </div>
      </Paper>
    )
  }
}
