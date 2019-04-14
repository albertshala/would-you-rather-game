import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { Segment } from 'semantic-ui-react'

class Login extends Component {

    selectUser = (e) => {
        const id = e.target.value;
        e.preventDefault();
        
        this.setState({ selectedUser: id }, () => {
            this.props.setUser(id);
        });
    }

    render() {
        const { users } = this.props;
        return (
          <Segment.Group horizontal>
            <Segment>
            <h3>Login</h3>
            <select onChange={ this.selectUser }>
              <option defaultValue>Select a user account</option>
                { users && Object.values(users).map((user) => 
                    <option value={user.id} key={user.id}>{user.name}</option>
                )}
            </select>
            </Segment>
          </Segment.Group>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (id) => dispatch(setAuthedUser(id)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);