import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Grid, Segment } from 'semantic-ui-react';
import { handleVote } from '../../actions/questions';
import { Link } from 'react-router-dom';

class Question extends Component {

  state = {
    optionOneSelected: false,
    optionTwoSelected: false,
  }

  submitVote = (qid, answer) => {
    const { voteFor } = this.props;
    
    return voteFor(qid, answer)
  }
  
    render() {
      const { users, userDetails, questions, isSingle = null } = this.props;
      const { id, author, optionOne, optionTwo } = questions;
      const circle = { width: 175, height: 175 }

      const userId = userDetails && userDetails.id ? userDetails.id : null;
      const currentUser = users ? users[author] : [];

      const optionOneSelected = optionOne.votes.includes(userId);
      const optionTwoSelected = optionTwo.votes.includes(userId);
    
      const opt1 = Object.keys(users).map((user) => optionOne.votes.includes(user));
      const opt2 = Object.keys(users).map((user) => optionTwo.votes.includes(user));
      const firstPick = opt1.filter((votes) => votes).length + ' out of ' + opt1.length;
      const secondPick = opt2.filter((votes) => votes).length + ' out of ' + opt2.length;
      
      const firstPercent = (opt1.filter((votes) => votes).length / opt1.length * 100).toFixed(2);
      const secondPercent = (opt2.filter((votes) => votes).length / opt2.length * 100).toFixed(2);

      return (
        <Grid.Row>
          { userId === null ? 
          <Grid.Column>
            <p>No answered questions, yet!</p>
          </Grid.Column>
          :
          <Grid.Column>
          { !isSingle ? 
            <Fragment>
              <div className="ui cards">
                <div className="ui card">
                  <div className="content">
                    <img src={currentUser.avatarURL} alt={`Profile pic of ${currentUser.name}`} className={`ui mini right floated image`} />
                    <div className="header">{currentUser.name} asks</div>
                    <div className="meta">Would you rather?</div>
                    <br />
                    <p>{ optionOne.text }... or</p>
                  </div>
                  <div className={`extra content`}>
                    <div className={`ui one buttons`}>
                      <Link to={`/question/${id}`}>
                        <Button.Group>
                          <Button>View Poll</Button>
                        </Button.Group>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
            :
              <React.Fragment>
                <div className="ui cards">
                  <div className="ui card">
                    <div className="content">
                      <img src={currentUser.avatarURL} alt={`Profile pic of ${currentUser.name}`} className={`ui mini right floated image`} />
                      <div className="header">Would You Rather?</div>
                      <div className="meta">Asked by: <strong>{author}</strong></div>
                    </div>
                    
                    { optionOneSelected || optionTwoSelected 
                      ? 
                      <Fragment>
                        <div className={`extra content`}>
                          <div className={`ui two buttons`}>
                            <Button.Group>
                              <Button positive={optionOneSelected}>{ optionOne.text }</Button>
                              <Button.Or />
                              <Button positive={optionTwoSelected}>{ optionTwo.text }</Button>
                            </Button.Group>
                          </div>
                          <div className="content">
                          <div className="content" style={{ marginTop: '10px', marginBottom: '10px' }}>Number of people selected this option:</div>
                          { ( optionOneSelected ) ? 
                          <Segment circular style={circle}>
                            <Header as='h2'>
                              { `${firstPercent}%` }
                              <Header.Subheader>{firstPick}</Header.Subheader>
                            </Header>
                          </Segment>
                          : 
                          <Segment circular style={circle}>
                            <Header as='h2'>
                              { `${secondPercent}%` }
                              <Header.Subheader>{secondPick}</Header.Subheader>
                            </Header>
                          </Segment>
                          }
                          </div>
                        </div>
                      </Fragment>
                      : 
                      <div className={`extra content`}>
                        <div className={`ui two buttons`}>
                          <Button.Group>
                            <Button onClick={() => this.submitVote(id, 'optionOne')} positive={this.state.optionOneSelected}>{ optionOne.text }</Button>
                            <Button.Or />
                            <Button onClick={() => this.submitVote(id, 'optionTwo')} positive={this.state.optionTwoSelected}>{ optionTwo.text }</Button>
                          </Button.Group>
                        </div>
                      </div>
                      }
                  </div>
                </div>
              </React.Fragment>
            }
          </Grid.Column>
          }
        </Grid.Row>
        
      )
    }
}

const mapStateToProps = ({ users }) => {
  return {
    users
	}
};

const mapDispatchToProps = (dispatch) => {
  return {
    voteFor: (id, answer) => dispatch(handleVote(id, answer))
  }
}

Question.displayName = 'QuestionView';

export default connect(mapStateToProps, mapDispatchToProps)(Question);