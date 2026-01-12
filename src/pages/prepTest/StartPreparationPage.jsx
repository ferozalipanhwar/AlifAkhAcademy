import { useState } from "react";
import StartPreparationNavbar from "./StartPreparationNavbar";

// Dummy general prep content
const GeneralPrepContent = ({ subject }) => {
  if (!subject) {
    return (
      <p className="text-gray-500 text-center mt-20">
        Select a subject from the top navbar to start general preparation.
      </p>
    );
  }
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {subject.title} - General Preparation
      </h2>

      {/* MCQs will go here */}
      <p className="text-gray-600">
        MCQs for {subject.title} will appear here...
      </p>
    </div>
  );
};

// You can optionally keep past papers as a category in the top navbar
// Example: { id: 'spsc', title: 'SPSC Past Papers' }

const StartPreparationPage = () => {
  const [activeSubject, setActiveSubject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ===== Top navbar ===== */}
      <StartPreparationNavbar active={activeSubject} onSelect={setActiveSubject} />

      {/* ===== Main Outlet / Content ===== */}
      <div className="flex-1 max-w-7xl mx-auto w-full mt-4 px-4">
        <GeneralPrepContent subject={activeSubject} />
      </div>
    </div>
  );
};

export default StartPreparationPage;
