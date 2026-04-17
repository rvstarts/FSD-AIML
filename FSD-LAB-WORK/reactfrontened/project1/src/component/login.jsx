import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4007/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.msg === "success") {
        const normalizedEmail = email.trim().toLowerCase();
        localStorage.setItem("loggedInUserEmail", normalizedEmail);
        setIsSuccess(true);
        setMessage("Login success");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        setIsSuccess(false);
        const errorMessage = data.msg || "Login failed";
        setMessage(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      setIsSuccess(false);
      const errorMessage = "Unable to connect to backend server";
      setMessage(errorMessage);
      alert(errorMessage);
      console.log(error);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "520px" }}>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>

        {message && (
          <p className={`mt-3 mb-0 ${isSuccess ? "text-success" : "text-danger"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;