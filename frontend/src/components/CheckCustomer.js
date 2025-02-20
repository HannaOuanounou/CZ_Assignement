import { useState } from "react"; // Importing useState for local state handling
import axios from "axios"; // Importing Axios for API calls
import "bootstrap/dist/css/bootstrap.min.css";

// Retrieving API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const CheckCustomer = () => {
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  
  // Function triggered when clicking "Check" button
  const handleCheck = async () => {
    setMessage(""); // Reset message before request

    if (!customerId) {
      setMessage("Please enter a Customer ID.");
      setAlertType("warning");
      return;
    }

    try {
        const config = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_KEY, 
            },
            };
        
      // Sending GET request to verify if the Customer ID exists
      const response = await axios.get(`${API_URL}/customer/${customerId}`,config);
      
      // Checking API response and updating message
      if (response.status === 200 && response.data.exists) {
        setMessage("Customer ID exists!");
        setAlertType("success");
      }
    } catch (error) {

      // Handling errors if API request fails
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("Customer ID not found.");
          setAlertType("warning");
        } else {
          setMessage("Server error. Please try again.");
          setAlertType("danger");
        }
      } else {
        setMessage("Network error. Check your connection.");
        setAlertType("danger");
      }
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-primary">Check Customer ID</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <button onClick={handleCheck} className="btn btn-primary w-100">
        Check
      </button>
      {message && <div className={`alert alert-${alertType} mt-3`}>{message}</div>}
    </div>
  );
};

export default CheckCustomer;
