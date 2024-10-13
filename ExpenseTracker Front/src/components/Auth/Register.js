import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Prepare the user data to send to the backend
    const userData = {
      username,
      email,
      password,
      fullname,
    };

    try {
      // Fetch request to post data to the backend
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON
        },
        body: JSON.stringify(userData), // Convert the userData object to JSON
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Handle success (e.g., redirect to login)
      navigate("/login");
    } catch (error) {
      // If there's an error, show an error message
      setErrorMessage("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Full Name"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
