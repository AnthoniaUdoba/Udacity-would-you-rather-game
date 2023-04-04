import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";
import { addQuestion, answerQuestion, receiveQuestions } from "./questions";
import { addCreatedQuestion, receiveUsers, saveUserAnswer } from "./users";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => ({
        users,
        questions,
      }))
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addCreatedQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => {
        dispatch(answerQuestion(authedUser, qid, answer));
        dispatch(saveUserAnswer(authedUser, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}
