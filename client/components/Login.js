import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {
          marginRight: 10,
          marginTop: 15,
        };
        const welcomeText = 'Welcome >_<';
        return (
            <div className="login-form">
                <h3>{welcomeText}</h3>
                <TextField
                    hintText="username"
                    floatingLabelText="username"
                    defaultValue="" />
                <br />
                <TextField
                    hintText="password"
                    floatingLabelText="password"
                    type="password" />
                <br />
                <RaisedButton label="register" style={style} />
                <RaisedButton label="login" primary={true} />
            </div>
        )
    };
}
