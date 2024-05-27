/* eslint-disable react/prop-types */
const ConvertedRate = ({
  convertedAmount,
  toCurrency,
  fromCurrency,
  amount,
}) => {
  return (
    <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
      <h2>
        You converted from {amount} {fromCurrency} to {convertedAmount}{" "}
        {toCurrency}
      </h2>
    </div>
  );
};

export default ConvertedRate;
