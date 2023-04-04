import React from "react";
import { Link } from "react-router-dom";

class Question extends React.Component {
  render() {
    const { authedUser, user, question } = this.props;
    const id = question.id;
    const isAnswered = Object.keys(authedUser.answers).includes(question.id);

    return (
      <div className="question-container">
        <p className="level">{user.name} asked:</p>
        <div className="question-item">
          <div className="question-details">
            <p style={{ fontWeight: `bold` }}>Would you rather</p>
            <p style={{ width: `100px` }}>{question.optionOne.text}</p>
            {!isAnswered && (
              <Link to={`/questions/${id}`} className="view-poll-button">
                View Poll
              </Link>
            )}
            {isAnswered && (
              <Link to={`/result/${id}`} className="view-poll-button">
                View Poll
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
