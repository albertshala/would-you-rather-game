import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import { Container, Grid, Header } from 'semantic-ui-react'

import Nav from './components/Nav';
import Add from './components/Question/Add';
import QuestionView from './components/QuestionView';
import Login from './components/Login';
import QuestionList from './components/QuestionsList';
import Leaderboard from './components/Leaderboard';

class App extends Component {
  state = {
    activeLink: 'home'
  }

  componentDidMount() {
    const { dispatch } = this.props;
   dispatch(handleInitialData());
  }
  render() {
    const { users, authedUser } = this.props;

    if (!authedUser){
      return <Login />
    }
    
    if (authedUser){
      return (
        <Router>
        <Container>
          <Header as='h1' dividing textAlign="center">
          <Nav user={users[authedUser]} activeLink={this.state.activeLink} />
          </Header>
          <Grid.Column>
            <Route path='/' exact component={QuestionList} />
            <Route path='/add' exact component={Add} />
            <Route path='/question/:id' exact component={QuestionView} />
            <Route path='/leader-board' exact component={Leaderboard} />
          </Grid.Column>
        </Container>
        </Router>
      );
    }
  }
}

const mapStateToProps = ({users, questions, authedUser}) =>{
  return {
    authedUser,
    users,
    questions,
  }
};

export default connect(mapStateToProps)(App);
