
const features = [
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "🧠", // replace this with your own icon later
  },
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "👨‍🏫",
  },
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "🏅",
  },
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "💡",
  },
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "💻",
  },
  {
    title: "Online Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: "📘",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-16 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10">Features</h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50"
          >
            <div className="text-green-600 text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
