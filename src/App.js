import React from "react";
import TotalSales from "./components/TotalSales";
import SalesGrowth from "./components/SalesGrowth";
import NewCustomers from "./components/NewCustomers";
import RepeatCustomers from "./components/RepeatCustomers";
import CustomerGeography from "./components/CustomerGeography";
import CustomerLTV from "./components/CustomerLTV";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>E-commerce Analytics Dashboard</h1>
      <div className="chart-container">
        <TotalSales />
        <SalesGrowth />
        <NewCustomers />
        <RepeatCustomers />
        <CustomerGeography />
        <CustomerLTV />
      </div>
    </div>
  );
}

export default App;
