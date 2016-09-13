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
    }

    touchTap(event) {
        this.setState({open: !this.state.open});
    }

    onRequestChange(open) {
        this.setState({open});
    }
    
    navTo(path) { 
        this.setState({open: false});
        browserHistory.push('/' + path);
    };

    render() {
        return (
            <div id="header">
                <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                  <MenuItem onClick={this.navTo.bind(this, '')}>Home</MenuItem>
                  <MenuItem onClick={this.navTo.bind(this, 'posts')}>Posts</MenuItem>
                </Drawer>
                <AppBar title="React Loopback Example"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={<IconButton onClick={this.touchTap.bind(this)}><Menu /></IconButton>} />
            </div>
        )
    };
}
