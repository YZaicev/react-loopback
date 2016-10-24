import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isOpen } from '../actions/message'
import Snackbar from 'material-ui/Snackbar';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            message: ''
        };
    }

    componentWillReceiveProps(newProps) {
        const { show } = newProps;
        this.setState({show: show});
    }

    handleRequestClose() {
        this.props.dispatch(isOpen(false));
    }

    render() {
        return (
            <Snackbar
              open={this.state.show}
              message={this.props.text}
              action="Закрыть"
              onActionTouchTap={this.handleRequestClose.bind(this)}
            />
        )
    }
}

Message.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        text: state.message.text,
        show: state.message.show
    }
}

export default connect(mapStateToProps)(Message)
