import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ExpenseList from "./components/Expense/ExpenseList";
import AddExpense from "./components/Expense/AddExpense";
import EditExpense from "./components/Expense/EditExpense"; // Import EditExpense
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function App() {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const id= myuser.id;
  console.log(id)
  return (<>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />{" "}
        <Route path={`/expenses/${id}`} element={<ExpenseList />} />
        
        
        
        {/* Edit Expense Route */}
      </Routes>
    </Router>
   
    </>
  );
}

export default App;
