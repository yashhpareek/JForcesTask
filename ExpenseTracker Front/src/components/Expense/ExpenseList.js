import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const myuser = JSON.parse(localStorage.getItem("user"));
  const id= myuser.id;
  console.log(id)
  
  
  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expense/expensebyuser/${id}`);
        if (!response.ok) throw new Error("Failed to fetch expenses");
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setErrorMessage("Error fetching expenses. Please try again.");
      }
    };

    fetchExpenses();
  }, [id]);

  // Handle edit button click
  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setName(expense.name);
  };

  // Update an expense
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editingExpense) {
      const updatedExpense = {
        ...editingExpense,
        description,
        amount,
        name,
      };

      try {
        const response = await fetch(`http://localhost:8080/expense/update/${editingExpense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        });

        if (!response.ok) throw new Error("Failed to update expense");

        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editingExpense.id ? updatedExpense : expense
          )
        );
        setEditingExpense(null);
        setDescription("");
        setAmount("");
        setName("");
      } catch (error) {
        setErrorMessage("Error updating expense. Please try again.");
        console.error("Error updating expense:", error);
      }
    }
  };

  // Delete an expense
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/expense/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete expense");

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      setErrorMessage("Error deleting expense. Please try again.");
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} - {expense.name}
            <button onClick={() => handleEditClick(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingExpense && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Expense</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingExpense(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ExpenseList;
