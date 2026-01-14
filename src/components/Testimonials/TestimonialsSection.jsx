import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    title: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Alif-Akh Academy transformed the way I learn. The instructors explain complex topics so simply. I aced my finals thanks to the resources here!",
    rating: 5
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    title: "Junior Web Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "The web development course was a game-changer. I went from knowing nothing to building full-stack apps in just 3 months. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    title: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    text: "The creative arts section is underrated. The mentors provide genuine feedback that actually helps you improve your design eye.",
    rating: 4
  },
  {
    id: 4,
    name: "David Chen",
    title: "Data Analyst",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "I appreciated the flexibility. Being able to learn at my own pace while working a full-time job was exactly what I needed.",
    rating: 5
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section 
      id="Testimonials" 
      className="py-20 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-emerald-50 opacity-50">
        <Quote size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-emerald-50 opacity-50 rotate-180">
        <Quote size={120} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
          Student Stories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-12 text-gray-900">
          What Our Students Say
        </h2>

        {/* Testimonial Card */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-emerald-400 to-green-600">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>
                <div className="absolute -bottom-3 bg-emerald-600 text-white p-1.5 rounded-full border-4 border-white">
                  <Quote size={14} fill="currentColor" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < testimonials[activeIndex].rating ? "currentColor" : "none"} 
                    className={i < testimonials[activeIndex].rating ? "" : "text-gray-300"}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-gray-700 font-medium italic leading-relaxed max-w-2xl">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Author Info */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-emerald-600 font-medium text-sm">
                  {testimonials[activeIndex].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-emerald-600" : "w-2 bg-gray-300 hover:bg-emerald-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;