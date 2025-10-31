
const EducationSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-16 bg-white">
      {/* Left Side - Image */}
      <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
          alt="Education"
          className="rounded-2xl shadow-lg w-full max-w-md"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="md:w-1/2 w-full md:pl-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Education
        </h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Features with icons */}
        <ul className="space-y-4">
          <li className="flex items-center justify-center md:justify-start space-x-3">
            {/* 🔹 Replace with your icon */}
            <span className="text-green-600 text-xl">🎓</span>
            <span className="font-medium text-gray-800">Learn Anything</span>
          </li>
          <li className="flex items-center justify-center md:justify-start space-x-3">
            <span className="text-green-600 text-xl">👨‍🏫</span>
            <span className="font-medium text-gray-800">Talk To Our Instructors</span>
          </li>
          <li className="flex items-center justify-center md:justify-start space-x-3">
            <span className="text-green-600 text-xl">💬</span>
            <span className="font-medium text-gray-800">Speak With Others</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default EducationSection;
