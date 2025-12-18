
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ResultScreen from "./ResultScreen";
import TestCategories from "./TestCategories";
import TestScreen from "./TestScreen";
const TakeTest = () => {

  const [step, setStep] = useState("category");
  const [selectedTest, setSelectedTest] = useState(null);
  const [score, setScore] = useState(0);

  const user=JSON.parse(localStorage.getItem('user')) ||null;
 
   useEffect(() => {
    if (!user) {
      // If no user is found, redirect to login page
      window.location.href = '/AlifAkhAcademy/login';
    }}, []);
  const handleSelectTest = (test) => {
    setSelectedTest(test);
    setStep("test");
  };

  const handleSubmitTest = (obtainedScore) => {
    setScore(obtainedScore);
    setStep("result");
  };

  const handleRestart = () => {
    setStep("category");
    setSelectedTest(null);
    setScore(0);
  };

  return (
    <motion.div className="min-h-screen bg-gray-900 text-white p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold text-center mb-8">📝 Take Test – AlifAkhAcademy  </h1>
         <h1 className="text-3xl font-bold text-center mb-8"> {user? user.name:"user"} </h1>
      {step === "category" && <TestCategories onSelectTest={handleSelectTest} />}
      {step === "test" && <TestScreen test={selectedTest} onSubmit={handleSubmitTest} />}
      {step === "result" && <ResultScreen score={score} total={100} onRestart={handleRestart} />}
    </motion.div>
  );
};

export default TakeTest;





