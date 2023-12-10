import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const onSignIn = async (name, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/welcome");
        console.log(data);
      } else {
        console.log(response);
        console.error("Login failed");
        setName("");
        setPassword("");
        window.alert("Login failed. Please check your credentials.");

        setLoginFailed(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignIn(name, password);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="col-lg-4 border p-4 rounded">
        <h1 className="mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="name"
              className="form-control"
              placeholder=" Username"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Log In
          </button>

          <p className="text-center">
            New user? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
