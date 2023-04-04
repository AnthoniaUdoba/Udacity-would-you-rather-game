import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";
import PageNotFound from "./PageNotFound";

function QuestionPoll(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { users, questions } = props;

  const question = questions[id];

  if (!question) {
    return <PageNotFound />;
  }

  const user = users[question.author];

  const handleChange = (e) => {
    const selectedOption = e.target.value;

    setSelectedOption(selectedOption);
  };

  const handleSubmit = (evt, qid) => {
    evt.preventDefault();

    const { dispatch } = props;
    const answer = selectedOption;

    dispatch(handleAnswerQuestion(qid, answer));
    navigate(-1);
  };

  return (
    <div className="question-container">
      <div>
        <p style={{ fontWeight: `bold` }}>{user.name} asks:</p>
        <div className="question-item">
          <div
            className="user-avatar"
            style={{ backgroundImage: `url(${user.avatarURL})` }}
          ></div>
          <div className="">
            <p style={{ fontWeight: `bold` }}>Would you rather</p>
            <form onSubmit={(evt) => handleSubmit(evt, question.id)}>
              <input
                id="option_one"
                type="radio"
                name="answer"
                value="optionOne"
                checked={selectedOption === "optionOne"}
                onChange={handleChange}
              />
              <label htmlFor="option_one">{question.optionOne.text}</label>
              <br />
              <input
                id="option_two"
                type="radio"
                name="answer"
                value="optionTwo"
                checked={selectedOption === "optionTwo"}
                onChange={handleChange}
              />
              <label htmlFor="option_two">{question.optionTwo.text}</label>
              <br />
              <button
                className="submit-button"
                type="submit"
                disabled={selectedOption === ""}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionPoll);
