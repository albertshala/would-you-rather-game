import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

function addQuestion( question ) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function answerQuestion({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleVote(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const vote = { authedUser, qid, answer };
        
        return saveQuestionAnswer(vote)
        .then((result) => {
            dispatch(answerQuestion(vote))
        })
    }
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            optionOneText, 
            optionTwoText,
            author: authedUser
        })
        .then((question) => 
        dispatch(addQuestion(question)))
    }
}

export function receiveQuestions ( questions ) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}