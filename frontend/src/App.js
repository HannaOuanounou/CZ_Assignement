import React from "react";
import AddCustomer from "./components/AddCustomer";
import CheckCustomer from "./components/CheckCustomer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Customer ID Management</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <AddCustomer />
        </div>
        <div className="col-md-6">
          <CheckCustomer />
        </div>
      </div>
    </div>
  );
}

export default App;
