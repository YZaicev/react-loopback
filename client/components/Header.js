import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { browserHistory } from 'react-router'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.closeMenu = this.closeMenu.bind(this);
        this.touchTap = this.touchTap.bind(this);
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
    };

    render() {
        return (
            <div id="header">
                <AppBar
                    title="React Loopback Example"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        <IconButton onClick={this.touchTap}>
                            <Menu />
                        </IconButton>
                    } />

                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={(open) => this.setState({open})}>

                    <AppBar title="Menu" onTitleTouchTap={this.closeMenu} onLeftIconButtonTouchTap={this.closeMenu}/>
                    <MenuItem onClick={this.navTo.bind(this, '')}>Home</MenuItem>
                    <MenuItem onClick={this.navTo.bind(this, 'posts')}>Posts</MenuItem>

                </Drawer>
            </div>
        )
    };
}
