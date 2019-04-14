import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {

    render() {
        const { users } = this.props;
        console.log('users ', Object.values(users));
        return (
            <div>
                { users.map( (user) => {
                    return <span key={user.id}>{user}</span>
                })}
            </div>
        )
    }
}


const mapStateToProps = ({ users, questions }) => {
    return {
        users: Object.values(users),
        questions
    }
}
export default connect(mapStateToProps, null)(Leaderboard);