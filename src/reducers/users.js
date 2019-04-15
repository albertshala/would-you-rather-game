import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions';

export default function users (state = [], action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            };
             
        case ADD_QUESTION:
            const { question } = action;
            const { id, author } = question;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: [...state[author].questions, id]
                }
            }
        case ANSWER_QUESTION: 
            const { authedUser, qid, answer } = action;      
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer,
                    }
                }
            }
        default:
            return state;
    }
}