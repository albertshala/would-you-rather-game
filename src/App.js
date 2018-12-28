import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import { route } from 'react-router';
import { Container, Grid, Header } from 'semantic-ui-react'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
   dispatch(handleInitialData());
  }
  render() {
    return (
      <Container>
        <Header as='h1' dividing textAlign="center">
        </Header>
        <Grid.Column>
            <Dashboard />
        </Grid.Column>
        
        {/* Header -> Login, Create new question, leaderboard */}
        {/* List of questions */}
      </Container>
    );
  }
}

const mapStateToProps = ({users, questions}) =>{
  return {
    users,
    questions,
  }
};

export default connect(mapStateToProps)(App);
