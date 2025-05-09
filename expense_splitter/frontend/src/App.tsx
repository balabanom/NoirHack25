import { useState } from "react";

export default function App() {
  const [paid, setPaid] = useState(["", "", ""]);
  const [total, setTotal] = useState("");
  const [output, setOutput] = useState("");

  const updatePaid = (index: number, value: string) => {
    const updated = [...paid];
    updated[index] = value;
    setPaid(updated);
  };

  const runProver = async () => {
    if (
      paid.some((val) => val.trim() === "" || isNaN(Number(val))) ||
      total.trim() === "" ||
      isNaN(Number(total))
    ) {
      alert("Please fill all fields with valid numbers.");
      return;
    }

    const paidSum = paid.reduce((acc, val) => acc + Number(val), 0);
    const n = paid.length;
    const expectedShare = Number(total) / n;

    // For simplicity, prove only for first person (index 0)
    const toml = `[input]
  paid = ${paid[0]}
  expected_share = ${expectedShare}
  total = ${total}
  `;

    await fetch("http://localhost:5050/write-toml", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: toml,
    });

    const res = await fetch("http://localhost:5050/run-prover");
    const text = await res.text();
    setOutput(text.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🧮 ZK Expense Splitter</h1>
      <div className="space-y-2 w-full max-w-sm">
        {paid.map((val, i) => (
          <input
            key={i}
            type="number"
            className="w-full p-2 border rounded"
            placeholder={`Paid by Person ${i + 1}`}
            value={val}
            onChange={(e) => updatePaid(i, e.target.value)}
          />
        ))}
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Total Expense"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <button
          onClick={runProver}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Run ZK Proof
        </button>
        {output && (
          <pre className="mt-4 p-4 bg-white border rounded text-sm overflow-auto">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}
