import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rahulk1@gmail.com");
  const [password, setPassword] = useState("Rahul@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      return navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <label className="form-control input my-3">
            <input
              type="text"
              value={emailId}
              className="grow"
              placeholder="Enter Email ID"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </label>
          <label className="form-control input my-3">
            <input
              type="password"
              value={password}
              className="grow"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
