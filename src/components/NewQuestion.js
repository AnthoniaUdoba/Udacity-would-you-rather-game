import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends React.Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  updateOptionOne = (option) => {
    this.setState(() => ({
      optionOne: option,
    }));
  };

  updateOptionTwo = (option) => {
    this.setState(() => ({
      optionTwo: option,
    }));
  };

  clearOptions = () => {
    this.updateOptionOne("");
    this.updateOptionTwo("");
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.clearOptions();
    this.setState({
      toHome: true,
    });
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    if (this.state.toHome === true) {
      return <Navigate to="/" replace={true} />;
    }

    return (
      <div className="new-question-container">
        <div>
          <h4>Create Question</h4>
          {/* <br></br> */}
          <p>Would you rather ...</p>
          <input
            className="createnew"
            type="text"
            placeholder="Question 1"
            value={optionOne}
            onChange={(event) => this.updateOptionOne(event.target.value)}
          />
          <p>Or</p>
          <input
            className="createnew"
            type="text"
            placeholder="Question 2"
            value={optionTwo}
            onChange={(event) => this.updateOptionTwo(event.target.value)}
          />
          <button
            className="submit-button"
            onClick={this.handleSubmit}
            disabled={optionOne === "" || optionTwo === ""}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(NewQuestion);
