import React, { Component } from 'react';
import { Header, Image, Table } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {
        const { users } = this.props;
        
        return (
            <Table basic='very' celled collapsing>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Questions Asked</Table.HeaderCell>
                    <Table.HeaderCell>Questions Answered</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {users.map(({ id, name, avatarURL, answers, questions }) => (
                  <Table.Row key={id}>
                    <Table.Cell>
                    <Header as='h4' image>
                        <Image src={avatarURL} rounded size='mini' />
                        <Header.Content>
                            { name }
                        </Header.Content>
                    </Header>
                    </Table.Cell>
                    <Table.Cell>{questions.length}</Table.Cell>
                    <Table.Cell>{Object.keys(answers).length}</Table.Cell>
                    <Table.Cell>{Object.keys(answers).length + questions.length}</Table.Cell>
                  </Table.Row>
                ))}
                </Table.Body>
            </Table>
        )
    }
}


const mapStateToProps = ({ users }) => {
    const totalUsers = Object.values(users).map(user => ({
        ...user,
        total: user.questions.length + Object.values(user.answers).length 
    }));

    return {
        users: totalUsers.sort((a, b) => b.total - a.total),
    }
};

export default connect(mapStateToProps, null)(Leaderboard);