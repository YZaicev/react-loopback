import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { loginAccount, registerAccount } from '../actions/account'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const welcomeText = 'Welcome >_<';
const verifiedText = 'Вы подтвердили свою почту, теперь можете войти';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.dispatch(getAccount());
    }

    componentWillMount() {
        this.setState({
            showVerifiedMessage: this.props.location.query.verified === "true"
        });
    }

    handleRequestClose() {
        this.setState({
            showVerifiedMessage: false
        });
    }

    handleNameChange(event) {
        this.handleChange('username', event.target.value);
    }

    handlePasswordChange(event) {
        this.handleChange('password', event.target.value);
    }

    handleChange(field, value) {
        let params = {};
        params[field] = value;
        this.setState(params);
    }

    onRegister() {
        this.props.dispatch(registerAccount({
            email: this.state.username,
            password: this.state.password
        }));
    }

    onLogin() {
        this.props.dispatch(loginAccount({
            email: this.state.username,
            password: this.state.password
        }));
    }

    componentWillReceiveProps(newProps) {
        const { isLogin } = newProps;
        isLogin && browserHistory.push('/');
    }

    render() {
        const style = {
          marginRight: 10,
          marginTop: 15,
        };
        const verified = this.props.location.query.verified === "true";
        return (
            <div>
                {
                    this.props.isRegistered ?<h3>На ваш почтовый адрес было отправлено письмо с подтверждением регистрации</h3> : 
                    <div>
                    <div className="login-form">
                        <h3>{welcomeText}</h3>
                        <TextField
                            hintText="username"
                            floatingLabelText="username"
                            defaultValue=""
                            value={this.state.username}
                            onChange={this.handleNameChange.bind(this)} />
                        <br />
                        <TextField
                            hintText="password"
                            floatingLabelText="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)} />
                        <br />
                        {!verified ? <RaisedButton onTouchTap={this.onRegister.bind(this)} label="register" style={style} /> : ''}
                        <RaisedButton onTouchTap={this.onLogin.bind(this)} label="login" primary={true} />
                    </div>
                    <Snackbar
                      open={this.state.showVerifiedMessage}
                      message={verifiedText}
                      action="Закрыть"
                      onActionTouchTap={this.handleRequestClose.bind(this)}
                    />
                    </div>
                }
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.account.isLogin,
        isRegistered: state.account.isRegistered,
        username: state.account.username
    }
}

export default connect(mapStateToProps)(Login)
