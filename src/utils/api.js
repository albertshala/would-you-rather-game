import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _formatQuestion,
    _saveQuestionAnswer
} from "./_DATA";

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion(question, authedUser) {
    return _saveQuestion(question, authedUser);
};

export function saveQuestionAnswer(authedUser, qid, answer) {
    return _saveQuestionAnswer(authedUser, qid, answer);
};

export function formatQuestion(question){
    return _formatQuestion(question);
}