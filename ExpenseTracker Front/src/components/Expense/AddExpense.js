import React, { useState } from "react";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  // const [user_id,setuser_id] = useState()
  const [errorMessage, setErrorMessage] = useState("");

  const myuser=JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    console.log(myuser.id);
    
    e.preventDefault();
    try {
      // Prepare the expense data
      const expenseData = {
        description,
        amount,
        name,
        user:{id:myuser.id}
      };

      // Send a POST request using fetch
      const response = await fetch("http://localhost:8080/expense/post", {
        method: "POST", // HTTP method for creating new data
        headers: {
          "Content-Type": "application/json", // The request body will be JSON
        },
        body: JSON.stringify(expenseData), // Convert the data to JSON format
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      // Clear form fields after successful submission
      setDescription("");
      setAmount("");
      setName("");
    } catch (error) {
      // Handle any errors during the fetch operation
      setErrorMessage("Error adding expense. Please try again.");
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddExpense;
