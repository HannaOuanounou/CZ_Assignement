import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL; // Compatible avec CRA

const AddCustomer = () => {
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    try {
      const response = await axios.put(`${API_URL}/customer`, { id: customerId });
      setMessage("Customer ID added successfully!");
      setAlertType("success");
    } catch (error) {
        setMessage("Error adding customer ID. Please try again.");
        setAlertType("danger");
      }
    
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-primary">Add Customer ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add
        </button>
      </form>
      {message && <div className={`alert alert-${alertType} mt-3`}>{message}</div>}
    </div>
  );
};

export default AddCustomer;
