import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const myuser=JSON.parse(localStorage.getItem("user"));
  const id = myuser.id;
 
  
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      {/* Navigate to expenses with id */}
      { <Link to={`/expenses/${id}`}>Expenses</Link>}
      <Link to="/add-expense">Add Expense</Link>
    </nav>
  );
};

export default Navbar;
