
const ResultScreen = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const pass = percentage >= 50;

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-4">📊 Test Result</h2>
      <p className="text-lg mb-2">Score: {score} / {total}</p>
      <p className="text-lg mb-4">Percentage: {percentage}%</p>
      <p className={`text-2xl font-bold mb-6 ${pass ? "text-green-400" : "text-red-400"}`}>{pass ? "PASS ✅" : "FAIL ❌"}</p>
      <button onClick={onRestart} className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl">
        Take Another Test
      </button>
    </div>
  );
};

export default ResultScreen;
