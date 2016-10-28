import React, { Component, PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { fetchUser, updateUser } from '../actions/users'
import { connect } from 'react-redux'

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openEdit: false,
            openEditPasswordDialog: false,
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchUser(this.props.params.userId))
    }

    openEdit(type, open) {
        if (type === 'edit') {
            this.setState({
                openEdit: open
            });
        } else if (type === 'editPassword') {
            this.setState({
                openEditPasswordDialog: open
            });
        }
    }

    submitEdit() {
        const params ={
            username: this.refs.username.getValue(),
            email: this.refs.email.getValue(),
        };
        this.props.dispatch(updateUser(this.props.user.id, params, this.openEdit.bind(this, 'edit', false)));
    }    

    onEdit(key) {
        const params = {};
        params[key] = this.refs[key].getValue();
        this.setState(params);
    }

    componentWillReceiveProps(newProps) {
        const { user } = newProps;
        if (user) {
            this.setState({
                username: user.username,
                email: user.email
            });
        }
    }

    render() {
        const cardActions = this.props.canEdit ? <CardActions>
                <FlatButton label="Edit" primary={true} onTouchTap={this.openEdit.bind(this, 'edit', true)} />
                <FlatButton label="Change Password" primary={true} onTouchTap={this.openEdit.bind(this, 'editPassword', true)} />
                <FlatButton label="Delete" secondary={true} />
            </CardActions> : '';

        return (
            <div>
                <br/>
                <Card>
                    <CardHeader
                        avatar={<Avatar icon={<FileFolder />} />}
                        title={this.props.user.username}
                        subtitle="user"
                    />
                    <CardText>
                        Email: {this.props.user.email}
                        <br/>
                        Tel: +8 987 987 9871
                    </CardText>
                    {cardActions}
                </Card>
                <Dialog
                    title="Edit Modal"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this.openEdit.bind(this, 'edit', false)}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            onTouchTap={this.submitEdit.bind(this)}
                        />
                    ]}
                    modal={true}
                    open={this.state.openEdit}>
                    <TextField
                        ref="username"
                        value={this.state.username}
                        onChange={this.onEdit.bind(this, 'username')}
                        floatingLabelText="Username"
                        floatingLabelFixed={true}
                    /><br />
                    <TextField
                        ref="email"
                        value={this.state.email}
                        onChange={this.onEdit.bind(this, 'email')}
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                    />
                </Dialog>
                <Dialog
                    title="Change Password"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this.openEdit.bind(this, 'editPassword', false)}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            onTouchTap={this.openEdit.bind(this, 'editPassword', false)}
                        />
                    ]}
                    modal={true}
                    open={this.state.openEditPasswordDialog}>
                    <TextField
                        ref="password"
                        value={this.state.password}
                        onChange={this.onEdit.bind(this, 'password')}
                        floatingLabelText="Password"
                        floatingLabelFixed={true}
                    /><br />
                    <TextField
                        ref="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onEdit.bind(this, 'confirmPassword')}
                        floatingLabelText="Confirm Password"
                        floatingLabelFixed={true}
                    />
                </Dialog>
            </div>
        )
    }
}

Users.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user && state.user.item,
        canEdit: state.session.isLogin &&
            ((state.session.account && state.session.account.id) === (state.user && state.user.item.id)),
    }
};

export default connect(mapStateToProps)(Users)
