import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import { useCallback, useEffect, useState } from "react";
function App() {
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenCurrencyTo = fromCurrency;
  const hiddenCurrencyFrom = toCurrency;

  async function getCurrencyList() {
    try {
      const response = await fetch(`https://api.frankfurter.app/currencies`);
      const data = await response.json();
      setCurrencyList(data);
    } catch (err) {
      alert(err);
    }
  }

  // convert the currency
  const convertCurrency = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      console.log(data);
      setConvertedAmount(data.rates?.[toCurrency]);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }, [amount, fromCurrency, toCurrency]);

  // swap the value of the currencies
  function swap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  useEffect(() => {
    getCurrencyList();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [
    amount,
    fromCurrency,
    toCurrency,
    convertCurrency,
    hiddenCurrencyTo,
    hiddenCurrencyFrom,
  ]);

  return (
    <>
      <section className="h-screen bg-[url('https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80')] bg-no-repeat bg-cover grid place-items-center ">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="max-w-lg shadow-lg backdrop-blur-sm p-3 rounded-lg relative ">
          <h1 className="text-center text-white my-2 font-bold text-2xl ">
            Currency Convertor
          </h1>
          <Input
            label="From"
            currencyList={currencyList}
            currentCurrency={fromCurrency}
            setCurrentCurrency={setFromCurrency}
            amount={amount}
            setAmount={setAmount}
            hiddenCurrency={hiddenCurrencyFrom}
          />
          <Input
            label="To"
            currencyList={currencyList}
            disabled
            currentCurrency={toCurrency}
            setCurrentCurrency={setToCurrency}
            amount={convertedAmount}
            hiddenCurrency={hiddenCurrencyTo}
          />
          <button
            onClick={convertCurrency}
            disabled={isLoading}
            className="bg-blue-400 text-white w-full h-12 rounded-lg cursor-pointer">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              ` Convert ${fromCurrency} to ${toCurrency}`
            )}
          </button>
          {/* swap button */}
          <button
            className="bg-blue-400 text-white px-2 absolute top-[45.5%] left-[43%]   cursor-pointer "
            onClick={swap}>
            Swap
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
