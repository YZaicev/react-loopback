import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions'
import { connect } from 'react-redux'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchPosts('posts'))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.items.map((post, i) =>
                        <li key={i}>{post.title} - {post.text}</li>
                    )}
                </ul>
            </div>
        )
    }
}

App.propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        items: state.data.items,
        isFetching: state.data.isFetching
    }
}

export default connect(mapStateToProps)(App)
