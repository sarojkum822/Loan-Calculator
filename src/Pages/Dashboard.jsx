import React, { useState } from "react";

const Dashboard = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termYears, setTermYears] = useState("");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState("USD");

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate);
    const totalMonths = parseInt(termYears) * 12;

    if (!principal || !annualInterestRate || !totalMonths) return;

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    setEmi(emi.toFixed(2));
    generateSchedule(principal, monthlyInterestRate, totalMonths, emi);
  };

  const generateSchedule = (principal, rate, months, emi) => {
    let balance = principal;
    const scheduleData = [];

    for (let i = 1; i <= months; i++) {
      const interest = balance * rate;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      scheduleData.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(scheduleData);
  };

  const resetTable = () => {
    setLoanAmount("");
    setInterestRate("");
    setTermYears("");
    setEmi(null);
    setSchedule([]);
  };

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold mb-6">Loan Calculator Dashboard</h1>
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block mb-1 font-medium">Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter rate"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Term (Years)</label>
          <input
            type="number"
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter term"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={calculateEMI}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          CALCULATE
        </button>
        <button
          onClick={resetTable}
          className="bg-purple-100 text-purple-700 px-6 py-2 rounded border border-purple-300"
        >
          RESET TABLE
        </button>
      </div>

      {emi && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Monthly EMI: {currency} {emi}
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border p-2 rounded w-32"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="EUR">INR</option>
              <option value="EUR">GBP</option>
              <option value="EUR">JPY</option>
              <option value="EUR">AUD</option>
              <option value="EUR">CAD</option>
            </select>
          </div>

          <div className="border rounded p-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">
              Amortization Schedule ({currency})
            </h3>
            <table className="min-w-full text-sm">
              <thead className="border-b font-medium text-left">
                <tr>
                  <th className="py-2">Month</th>
                  <th className="py-2">Principal</th>
                  <th className="py-2">Interest</th>
                  <th className="py-2">Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item) => (
                  <tr key={item.month} className="border-b">
                    <td className="py-2">{item.month}</td>
                    <td className="py-2">
                      {item.principal} {currency}
                    </td>
                    <td className="py-2">
                      {item.interest} {currency}
                    </td>
                    <td className="py-2">
                      {item.balance} {currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
