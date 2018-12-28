import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';

class Question extends Component {
    render() {
      const { qid, questions, unanswered, userDetails, authedUser } = this.props;
        const { author, votes, timestamp, optionOne, optionTwo } = questions;
	      const { id } = userDetails;
        console.log('questions ', optionOne.votes.includes(authedUser) );
        
        return (
          <React.Fragment>
            <Grid.Row>
              <Grid.Column>
                <Button.Group>
                  <Button positive={(optionOne.votes.includes(id)) ? true : false}>{ optionOne.text }</Button>
                  <Button.Or />
                  <Button positive={(optionTwo.votes.includes(id)) ? true : false}>{ optionTwo.text }</Button>
                </Button.Group>
                <p>Asked by: {author}</p>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>
        )
    }
}

export default Question;