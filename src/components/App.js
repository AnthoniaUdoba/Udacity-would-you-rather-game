import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionPoll from "./QuestionPoll";
import QuestionPollResults from "./QuestionPollResults";
import LeaderBoard from "./LeaderBoard";
import Navbar from "./Navbar";
import { LoadingBar } from "react-redux-loading-bar";
import PageNotFound from "./PageNotFound";
import RequireAuth from "./RequireAuth";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/add"
                element={
                  <RequireAuth>
                    <NewQuestion />
                  </RequireAuth>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <RequireAuth>
                    <LeaderBoard />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/questions/:id"
                element={
                  <RequireAuth>
                    <QuestionPoll />
                  </RequireAuth>
                }
              />
              <Route
                path="/result/:id"
                element={
                  <RequireAuth>
                    <QuestionPollResults />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default connect(mapStateToProps)(App);
