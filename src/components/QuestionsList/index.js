import React, { Component } from 'react';
import Question from '../Question';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Container, Segment, Divider, Grid } from 'semantic-ui-react';

class QuestionsList extends Component {
    render() {
        const { currentUser, unansweredQuestions, answeredQuestions} = this.props;
        const panes = [
            {
                menuItem: 'Unanswered', render: () =>
                    <Tab.Pane attached={false}>
                      <Container>
                      
                      </Container>
                    </Tab.Pane>
            },
            {
                menuItem: 'Answered', render: () =>
                    <Tab.Pane attached={false}>
	                    <Container>
		                    { answeredQuestions.map((questions) =>
			                    <Segment.Group key={questions.id}>
				                    <Question
					                    key={questions.id}
					                    unanswered={true}
					                    userDetails={currentUser}
					                    questions={ questions } />
			                    </Segment.Group>
		                    )}
	                    </Container>
                    </Tab.Pane>
            },
        ];
        return (
            <div>
                <Tab menu={{ pointing: true }} panes={panes} />
            </div>
        )
    }
}

const mapStateToProps = ({ users, questions, authedUser }) => {
    // Get the current user
    const currentUser = authedUser ? users[authedUser] : null;

    // All answered questions
		const answeredQs = Object.values(questions).filter( question =>
			question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
		);
		
		const unansweredQs = Object.values(questions).filter((question) => (
			!question.optionOne.votes.includes(authedUser) || !question.optionTwo.votes.includes(authedUser)
		));
		
		console.log('unansweredQs ', unansweredQs);
		console.log('answered qs ', answeredQs);
		
    return {
	    currentUser,
	    answeredQuestions: answeredQs.sort((a, b) => b.timestamp  - a.timestamp),
	    unansweredQuestions: unansweredQs.sort((a, b) => b.timestamp  - a.timestamp),
    }
};
export default connect(mapStateToProps)(QuestionsList);