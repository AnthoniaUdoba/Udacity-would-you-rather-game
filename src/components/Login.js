import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

function Login(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userId, setUserId] = useState(null);

  const onChange = (e) => {
    e.preventDefault();
    setUserId(e.target.value);
  };

  const Login = (evt) => {
    evt.preventDefault();
    props.dispatch(setAuthedUser(userId));
    console.log("PATH: ", state?.path);
    navigate(state?.from?.pathname || "/");
  };

  const { users } = props;
  return (
    <div className="sign-in-container">
      <div>
        <div className="desc">
          <h4 className="heading">Would You Rather!!</h4>
          <h5 className="text">
            Not sure about your choices? Let's help you out by easily creating
            polls!
          </h5>
        </div>
        <select className="login-select" id="login-select" onChange={onChange}>
          <option value={null}>Select User</option>
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="sign-in-button"
          onClick={Login}
          disabled={userId === null}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
