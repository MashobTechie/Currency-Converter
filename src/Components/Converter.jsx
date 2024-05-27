/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ConvertedRate from "./ConvertedRate";

const Converter = () => {
  const appID = "a76c1baadef6487f86699765ae520b1d";
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${appID}`
      );
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const data = await response.json();
      setRates(data.rates);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  useEffect(() => {
    if (!amount || isNaN(amount)) {
      return;
    }
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    if (rateFrom && rateTo) {
      const converted = (amount / rateFrom) * rateTo;
      setConvertedAmount(converted.toFixed(2));
    } else {
      setError("Invalid currency selected.");
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold mb-4">Currency Converter</h1>
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
          {loading ? (
            <h2 className="text-blue-500">Loading...</h2>
          ) : error ? (
            <h2 className="text-red-500">{`Error: ${error}`}</h2>
          ) : (
            <>
              <form className="space-y-4 mt-4">
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex space-x-4">
                  <select
                    className="border border-gray-300 p-2 flex-1 rounded-md"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 p-2 flex-1 rounded-md"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
               </form>
               
              {convertedAmount && (
                <ConvertedRate
                  amount={amount}
                  fromCurrency={fromCurrency}
                  convertedAmount={convertedAmount}
                  toCurrency={toCurrency}
                />
                
              )}
              
            </>
          )}
        </div>
        <h3>Developed by : MASHOBTECHIE</h3>
      </div>
    </>
  );
};

export default Converter;
