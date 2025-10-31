import { useState } from "react";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO Smart Edu",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Michael Smith",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "David Johnson",
    title: "Head of Product",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Robert Brown",
    title: "CTO Tech Corp",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "William Lee",
    title: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  return (
    <section id="Teachers" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Our Teachers
        </h2>

        {/* Avatar carousel */}
        <div className="flex items-center justify-center space-x-4 mb-6 relative">
          <button
            onClick={prev}
            className="absolute left-0 text-gray-400 hover:text-gray-600 text-2xl"
          >
            &#10094;
          </button>

          {testimonials.map((client, index) => (
            <img
              key={index}
              src={client.image}
              alt={client.name}
              className={`w-16 h-16 rounded-full object-cover border-4 transition-all duration-300 ${
                index === activeIndex
                  ? "border-blue-500 scale-110 opacity-100"
                  : "border-transparent opacity-50"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}

          <button
            onClick={next}
            className="absolute right-0 text-gray-400 hover:text-gray-600 text-2xl"
          >
            &#10095;
          </button>
        </div>

        {/* Testimonial text */}
        <p className="text-gray-600 italic max-w-2xl mx-auto mb-6">
          “{testimonials[activeIndex].text}”
        </p>

        {/* Name + Title */}
        <h3 className="text-lg font-semibold text-gray-800">
          {testimonials[activeIndex].name}
        </h3>
        <p className="text-gray-500">{testimonials[activeIndex].title}</p>

        {/* Dots navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
