import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { backendBaseURL, localBaseURL } from "../api";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(`${backendBaseURL}/api/register`, {
        name,
        email,
        password,
      });
      console.log("res:", response);

      if (response.status === 200) {
        alert(response.data.message);
      }
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
      if (error.response) {
        setMessage(error.response.data.message);
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
            Sign Up
          </h1>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 w-full p-2 rounded-lg"
              />
            </div>
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
              Sign Up
            </button>

            {message && (
              <p className="text-red-600 m-4 text-center">{message}</p>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
