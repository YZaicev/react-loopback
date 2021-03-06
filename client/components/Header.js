import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { getAccount, logoutAccount } from '../actions/account'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.closeMenu = this.closeMenu.bind(this);
        this.touchTap = this.touchTap.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAccount());
    }

    touchTap(event) {
        this.setState({open: !this.state.open});
    }

    closeMenu() {
        this.setState({open: false});
    }

    onRequestChange(open) {
        this.setState({open});
    }
    
    navTo(path) { 
        this.closeMenu();
        browserHistory.push('/' + path);
    }

    logout() {
        this.props.dispatch(logoutAccount());
    }

    componentWillReceiveProps(newProps) {
        const { isLogin } = newProps;
        !isLogin && browserHistory.push('/login');
    }

    render() {
        const backgroundColor = {
          backgroundColor: '#00bcd4',
        };
        const account = this.props.account;
        return (
            <div id="header">
                <AppBar
                    title="React Loopback Example"
                    iconElementLeft={
                        <IconButton onClick={this.touchTap}>
                            <Menu />
                        </IconButton>}
                    iconElementRight={this.props.isLogin ?
                        <div style={{marginTop: '4px'}}>
                            {this.props.username}<FlatButton style={{color: '#fff'}} color="#fff" label="Logout" onClick={this.logout.bind(this)} />
                        </div>:
                        <FlatButton label="Login" onClick={this.navTo.bind(this, 'login')} />} />
                
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={(open) => this.setState({open})}>

                    <AppBar title="Menu" onTitleTouchTap={this.closeMenu} onLeftIconButtonTouchTap={this.closeMenu}/>
                    <MenuItem onClick={this.navTo.bind(this, '')}>Home</MenuItem>
                    {this.props.isLogin ? <MenuItem onClick={this.navTo.bind(this, 'users')}>Users</MenuItem> : ''}

                </Drawer>
            </div>
        )
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.session.isLogin,
        username: state.session.account && state.session.account.username
    }
}

export default connect(mapStateToProps)(Header)
