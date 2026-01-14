import { useEffect, useState } from 'react';
// import '../../style/home.css'; // You can keep this if you have custom styles

const Home = () => {
    const slides = [
        {
            id: 1,
            title: "Knowledge is Power",
            subtitle: "Every Successful Career Starts with Good Education",
        },
        {
            id: 2,
            title: "Learn Without Limits",
            subtitle: "Education opens the door to success",
        },
        {
            id: 3,
            title: "Shape Your Future",
            subtitle: "Invest in knowledge, it pays the best interest",
        },
        {
            id: 4,
            title: "Success Starts Here",
            subtitle: "Empowering students with quality learning",
        },
    ];

    const [current, setCurrent] = useState(0);

    // Auto-slide logic (Optional - remove if you want manual only)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section id='Home' className="relative w-full h-screen overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                
                {/* Main Text Content */}
                <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm font-semibold tracking-wider uppercase mb-2 backdrop-blur-sm">
                        Welcome to Alif-Akh Academy
                    </span>

                    <h1 
                        key={`title-${current}`} // Key triggers animation on change
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-lg transition-all duration-700 ease-in-out transform translate-y-0 opacity-100"
                    >
                        {slides[current].title}
                    </h1>

                    <p 
                        key={`sub-${current}`}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md transition-all duration-700 delay-100"
                    >
                        {slides[current].subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <a
                            href="#Courses"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-emerald-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-1"
                        >
                            Explore Courses
                            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Slider Indicators (Dots) */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`group relative h-3 transition-all duration-300 rounded-full ${
                                current === index ? "w-12 bg-emerald-500" : "w-3 bg-white/30 hover:bg-white/50"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded opacity-0 transition-opacity ${current === index ? "group-hover:opacity-0" : "group-hover:opacity-100"}`}>
                                {index + 1}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Home;