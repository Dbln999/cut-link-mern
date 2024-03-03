import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { updateToken } from "../store/tokenSlice";

const AuthPage = () => {
  const signUp = async () => {
    await axios
      .post("http://localhost:5000/auth/registration", {
        username,
        password,
      })
      .then((res) => console.log(res));
  };

  const dispatch = useAppDispatch();

  const signIn = async () => {
    await axios
      .post(
        "http://localhost:5000/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(updateToken(res.data.token));
        console.log(document.cookie);
      });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="w-2/6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="bg-white w-full shadow-lg rounded px-2 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter the password here"
            />
          </div>
          <div className="flex items-center justify-around">
            <button
              onClick={signUp}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <button
              onClick={signIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
