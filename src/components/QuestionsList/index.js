import React, { Component } from 'react';
import Question from '../Question';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';

class QuestionsList extends Component {

    render() {
		const { currentUser, unansweredQuestions, answeredQuestions } = this.props;
		
        const panes = [
            {
			menuItem: 'Unanswered', render: () =>
				<Tab.Pane attached={false}>
					<Container>
					{ unansweredQuestions && unansweredQuestions.map((questions) =>
							<Segment.Group key={questions.id}>
								<Question
									key={questions.id}
									userDetails={currentUser}
									questions={ questions } />
							</Segment.Group>
						)}
					</Container>
				</Tab.Pane>
            },
            {
			menuItem: 'Answered', render: () =>
				<Tab.Pane attached={false}>
					<Container>
						{answeredQuestions && answeredQuestions.map((questions) =>
							<Segment.Group key={questions.id}>
								<Question
									key={questions.id}
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
				<h3>Would you rather?</h3>
                <Tab menu={{ pointing: true }} panes={panes} />
            </div>
        )
    }
}

const mapStateToProps = ({ users, questions, authedUser }, { match } ) => {
	// Get the current user
	const currentUser = authedUser ? users[authedUser] : null;

	// Find single question
	const singleQs = match ? Object.values(questions).filter( question => question.id === match.params.id ) : null;
	
    // All answered questions
	const answeredQs = Object.values(questions).filter( question =>
		question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
	);
	// All unanswered questions
	const unansweredQs = Object.values(questions).filter((question) => (
		!question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)
	));
		
    return {
		currentUser,
		singleQuestion: singleQs,
	    answeredQuestions: answeredQs.sort((a, b) => b.timestamp - a.timestamp),
	    unansweredQuestions: unansweredQs.sort((a, b) => b.timestamp - a.timestamp),
	}
};

const QuestionList = connect(mapStateToProps)(QuestionsList);
export default QuestionList;