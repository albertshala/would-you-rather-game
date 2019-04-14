import React, { Component } from 'react';
import Question from '../Question';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';

class QuestionView extends Component {
    render() {
      const { currentUser, singleQuestion } = this.props;
    
      return (
        <Container>
          { singleQuestion && (
            <Segment.Group key={singleQuestion.id}>
            <Question
              key={singleQuestion.id}
              userDetails={currentUser}
              isSingle={true}
              questions={ singleQuestion } 
            />
            </Segment.Group>
          )}
        </Container>  
        )
    }
}

const mapStateToProps = ({ users, questions, authedUser }, { match } ) => {
  // Get the current user
	const currentUser = authedUser ? users[authedUser] : null;
	// Find single question
	const singleQs = match ? Object.values(questions).filter( question => question.id === match.params.id ) : null;
	
    return {
    currentUser,
		singleQuestion: singleQs[0],
	}
};

const QuestionVieww = connect(mapStateToProps)(QuestionView);
export default QuestionVieww;