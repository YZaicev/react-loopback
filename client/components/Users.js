import React, { Component, PropTypes } from 'react'
import { fetchUsers } from '../actions/users'
import { connect } from 'react-redux'

class Users extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers('users'))
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>
                    {this.props.items.map((user, i) =>
                        <li key={i}>{user.id} - {user.email}</li>
                    )}
                </ul>
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
