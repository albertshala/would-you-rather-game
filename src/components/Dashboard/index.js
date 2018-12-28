import React, { Component } from 'react';
import QuestionsList from '../QuestionsList';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
	      console.log('props ', this.props);
        const { questionId } = this.props;
        return (
            <div>
                <QuestionsList />
            </div>
        )
    }
}

const mapStateToProps = ({ questions }) => {
    return {
        questionId: Object.keys(questions)
              .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
};

// Outline steps

// Select user
// Based on user, show unaswered and answered questions

export default connect(mapStateToProps)(Dashboard);