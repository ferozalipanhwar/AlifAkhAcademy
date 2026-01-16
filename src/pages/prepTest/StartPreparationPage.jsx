import { Sparkles } from "lucide-react";
import { useState } from "react";
import DynamicNavbar from "./DynamicNavbar"; // Import the NEW navbar
import SubjectDashboard from "./SubjectDashboard"; // Import the dashboard from previous step

const StartPreparationPage = () => {
  const [activeSubject, setActiveSubject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
    

    

      {/* 2. Spacer to push content below fixed navbar */}
      <div className="h-20" /> 

      {/* 3. Prep Subject Navbar (Horizontal Scroll) */}
      <DynamicNavbar active={activeSubject} onSelect={setActiveSubject} />

      {/* 4. Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        
        {/* SAFETY CHECK: Only render dashboard if activeSubject exists */}
        {activeSubject ? (
          <SubjectDashboard 
             key={activeSubject._id} // Force re-render on subject change
             subject={activeSubject} 
          />
        ) : (
          // Loading / Empty State
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="text-emerald-600" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-700">Select a Subject to Begin</h2>
            <p className="text-gray-500">Choose a subject from the top bar to view MCQs.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StartPreparationPage;