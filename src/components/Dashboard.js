import React from "react";
import { connect } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Question from "./Question";

class Dashboard extends React.Component {
  render() {
    const { authedUser, users, questions } = this.props;
    const answeredQuiz = Object.keys(users[authedUser].answers)
      .map((qId) => questions[qId])
      .sort((a, b) => b.timestamp - a.timestamp);
    const unAnsweredQuiz = Object.keys(questions)
      .filter((qId) => !Object.keys(users[authedUser].answers).includes(qId))
      .map((qId) => questions[qId])
      .sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        <Tabs className="tabs">
          <TabList>
            <Tab>Unanswered Questions</Tab>
            <Tab>Answered Questions</Tab>
          </TabList>
          <TabPanel>
            <ul className="question-list">
              {unAnsweredQuiz.map((question) => (
                <li key={question.id}>
                  <Question
                    authedUser={users[authedUser]}
                    user={users[question.author]}
                    question={question}
                  />
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className="question-list">
              {answeredQuiz.map((question) => (
                <li key={question.id}>
                  <Question
                    authedUser={users[authedUser]}
                    user={users[question.author]}
                    question={question}
                  />
                </li>
              ))}
            </ul>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions,
  };
}

export default connect(mapStateToProps)(Dashboard);
