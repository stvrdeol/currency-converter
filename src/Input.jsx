function Input({
  label,
  currencyList,
  disabled = false,
  currentCurrency,
  setCurrentCurrency,
  amount,
  setAmount,
  hiddenCurrency,
}) {
  return (
    <>
      <section className="flex p-5 justify-between rounded-lg mb-2 gap-6 bg-white ">
        <section className="flex flex-col">
          <label htmlFor={label}>{label}</label>
          <input
            type="number"
            name={label}
            id={label}
            disabled={disabled}
            className="outline-none px-2 py-1 mt-2 bg-white border-b-2 border-black "
            min={1}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </section>
        <section className="flex flex-col gap-3">
          <label htmlFor="currencies">Currency Type</label>
          <select
            name="currencies"
            id="currencies"
            onChange={(e) => setCurrentCurrency(e.target.value || "")}
            value={currentCurrency}>
            {Object.keys(currencyList).map((currency) =>
              currency != hiddenCurrency ? (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ) : null
            )}
          </select>
        </section>
      </section>
    </>
  );
}

export default Input;
