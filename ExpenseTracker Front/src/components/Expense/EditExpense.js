import React, { useEffect, useState } from "react";
import { getExpenseById, editExpense } from "../../services/expenseService";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getExpenseById(id);
        setDescription(response.data.description);
        setAmount(response.data.amount);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching the expense", error);
        setErrorMessage("Could not load the expense. Please try again.");
      }
    };
    fetchExpense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      description,
      amount,
      name,
    };

    try {
      await editExpense(id, updatedExpense); // Update the expense
      navigate("/expenses"); // Redirect to the expense list after successful update
    } catch (error) {
      console.error("Error updating the expense", error);
      setErrorMessage("Could not update the expense. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
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
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
