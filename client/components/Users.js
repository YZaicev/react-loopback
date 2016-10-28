import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pinkA200} from 'material-ui/styles/colors';
import { fetchUsers } from '../actions/users'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Users extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers('users'))
    }

    goToUser(id) {
        browserHistory.push('/users/' + id);
    }

    render() {
        const self = this;
        return (
            <div>
                <List>
                    <Subheader>Users</Subheader>
                    {this.props.items.map((user, i) =>
                        <ListItem 
                            key={i}
                            primaryText={user.email} 
                            onTouchTap={this.goToUser.bind(this, user.id)}
                            leftIcon={<ActionGrade color={pinkA200}/> }
                        />)}
                </List>
            </div>
        )
    }
}

Users.propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        items: state.users.items,
        isFetching: state.users.isFetching
    }
}

export default connect(mapStateToProps)(Users)
