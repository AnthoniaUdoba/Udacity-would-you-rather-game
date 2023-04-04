export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_CREATED_QUESTION = "ADD_CREATED_QUESTION";
export const SAVE_USER_ANSWER = "SAVE_USER_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addCreatedQuestion({ id, author }) {
  return {
    type: ADD_CREATED_QUESTION,
    id,
    authedUser: author,
  };
}

export function saveUserAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    answer,
    qid,
  };
}
