import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the login data
      const loginData = {
        username,
        password,
      };

      // Make a fetch POST request to the login endpoint
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Handle the response (e.g., storing token in localStorage)
      const data = await response.json();
      console.log(data);

      // Extract the user ID from the response data
      const userId = data.id; // assuming userId is returned in the response
      console.log(userId);
      
      // Optionally store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Navigate to the ExpenseList page and include userId in the route
      navigate(`/expenses/${userId}`);

    } catch (error) {
      // Handle login error
      setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
