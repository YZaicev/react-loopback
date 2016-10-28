import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { getAccount, loginAccount, registerAccount } from '../actions/account'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { showMessage } from '../actions/message'

const welcomeText = 'Welcome >_<';
const verifiedText = 'Вы подтвердили свою почту, теперь можете войти';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            isRegister: false
        };
    }

    componentDidMount() {
        this.props.dispatch(getAccount());
    }

    componentWillMount() {
        if (this.props.location.query.verified === "true") {
            this.props.dispatch(showMessage(verifiedText));
        }
    }

    handleRequestClose() {
        this.setState({
            showVerifiedMessage: false
        });
    }

    handleChange(field, event) {
        let params = {};
        params[field] = event.target.value;
        this.setState(params);
    }

    onRegister() {
        if (this.state.isRegister) {
            this.props.dispatch(registerAccount({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }));
        } else {
            this.setState({
                isRegister: true
            });
        }
        
    }

    onLogin() {
        if (!this.state.isRegister) {
            this.props.dispatch(loginAccount({
                email: this.state.email,
                password: this.state.password
            }));
        } else {
            this.setState({
                isRegister: false
            });
        }
    }

    componentWillReceiveProps(newProps) {
        const { isLogin, isRegistered } = newProps;
        isLogin && browserHistory.push('/');
        isRegistered && this.props.dispatch(showMessage('На ваш почтовый адрес было отправлено письмо с подтверждением регистрации'));
    }

    render() {
        const style = {
          marginRight: 10,
          marginTop: 15,
        };
        const verified = this.props.location.query.verified === "true";
        return (
            <div className="login-form">
                <h3>{welcomeText}</h3>
                {this.state.isRegister ? <div><TextField
                    hintText="username"
                    floatingLabelText="username"
                    defaultValue=""
                    value={this.state.username}
                    onChange={this.handleChange.bind(this, 'username')} />
                <br /></div> : ''}
                <TextField
                    hintText="email"
                    floatingLabelText="Email"
                    defaultValue=""
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, 'email')} />
                <br />
                <TextField
                    hintText="password"
                    floatingLabelText="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this, 'password')} />
                <br />
                {!verified || this.props.isRegistered ? <RaisedButton onTouchTap={this.onRegister.bind(this)} label="register" style={style} primary={this.state.isRegister} /> : ''}
                <RaisedButton onTouchTap={this.onLogin.bind(this)} label="login" primary={!this.state.isRegister} />
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.session.isLogin,
        isRegistered: state.session.isRegistered
    }
}

export default connect(mapStateToProps)(Login)
