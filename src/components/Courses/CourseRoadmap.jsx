import { motion } from "framer-motion";

const roadmapData = {
  courseTitle: "🌱 Web Development Roadmap",
  overview:
    "This 3-month roadmap will take you from basics to advanced web development — step by step.",
  duration: "3 Months",
  stages: [
    {
      title: "First 15 Days — HTML & CSS",
      description:
        "Learn the structure and styling of web pages. Build beautiful layouts using Flexbox and Grid.",
      icon: "💻",
      color: "bg-green-500",
    },
    {
      title: "Next 15 Days — JavaScript Fundamentals",
      description:
        "Understand core concepts like variables, loops, functions, DOM manipulation, and events.",
      icon: "⚡",
      color: "bg-blue-500",
    },
    {
      title: "Day 31–45 — React Basics",
      description:
        "Learn how to build reusable components, use state and props, and create interactive UIs.",
      icon: "⚛️",
      color: "bg-purple-500",
    },
    {
      title: "Day 46–60 — Advanced React",
      description:
        "Dive into hooks, routing, context API, and connecting with APIs to build dynamic apps.",
      icon: "🚀",
      color: "bg-yellow-500",
    },
    {
      title: "Final Phase — Project & Deployment",
      description:
        "Build your full project and deploy it using GitHub Pages or Netlify. Showcase your skills!",
      icon: "🎯",
      color: "bg-red-500",
    },
  ],
};

const CourseRoadmap = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-16 px-6 md:px-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-3">
        {roadmapData.courseTitle}
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-2">
        {roadmapData.overview}
      </p>
      <p className="text-green-600 font-semibold text-center mb-12">
        ⏳ Duration: {roadmapData.duration}
      </p>

      <div className="relative flex flex-col items-center">
        {/* Timeline Line */}
        <div className="absolute w-1 bg-green-200 h-full left-1/2 transform -translate-x-1/2 hidden md:block"></div>

        {/* Roadmap Stages */}
        {roadmapData.stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-between w-full max-w-4xl mb-10 relative`}
          >
            {/* Left/Right Alternate Position */}
            <div
              className={`w-full md:w-5/12 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}
            >
              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {stage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>

            {/* Center Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${stage.color} text-white text-2xl font-bold shadow-lg z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2`}
            >
              {stage.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CourseRoadmap;
