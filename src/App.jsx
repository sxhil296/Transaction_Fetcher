import React, { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorMessage(""); // Clear error message when user changes input
  };

  const fetchData = async () => {
    if (isNaN(inputValue) || inputValue === "0" || inputValue.trim() === "") {
      setTransactions([]);
      setErrorMessage("Please enter a correct transaction ID");
      return;
    }

    try {
      const response = await fetch("/transactions.json");
      const data = await response.json();
      const filteredData = data.filter(
        (transaction) => transaction.id.toString() === inputValue
      );

      if (filteredData.length === 0) {
        setErrorMessage("Transaction does not exist");
      } else {
        setErrorMessage("");
      }
      setTransactions(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transaction Fetcher</h1>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter transaction ID"
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white rounded p-2"
        >
          Fetch
        </button>
      </div>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {transactions.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b">{transaction.id}</td>
                <td className="py-2 px-4 border-b">{transaction.name}</td>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
                <td className="py-2 px-4 border-b">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
