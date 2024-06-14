/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingAnimation from "./LoadingAnimation";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      console.log("res:", res);

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-grow items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">
            Login
          </h1>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 w-full p-2 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-400 w-full p-2 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-semibold"
            >
              Login
            </button>

            {error && <p className="text-red-600 m-4 text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
