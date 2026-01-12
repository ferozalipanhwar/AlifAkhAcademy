import { useState } from "react";
import ResultScreen from "./ResultScreen";
import TestCategories from "./TestCategories";
import TestScreen from "./TestScreen";

const TakeTest = () => {
  const [step, setStep] = useState("categories");
  const [selectedTest, setSelectedTest] = useState(null);
  const [result, setResult] = useState(null);

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setStep("test");
  };

  const handleResult = (resultData) => {
    setResult(resultData);
    setStep("result");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {step === "categories" && (
          <TestCategories onStart={handleStartTest} setStep={setStep} />
        )}

        {step === "test" && (
          <TestScreen test={selectedTest} onFinish={handleResult} />
        )}

        {step === "result" && (
          <ResultScreen result={result} />
        )}
      </div>
    </div>
  );
};

export default TakeTest;