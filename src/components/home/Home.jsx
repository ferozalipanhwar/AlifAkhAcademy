import React, { useState } from 'react'
import '../../style/home.css'
const Home = () => {
    const slides = [
        {
            id: 1,
            title: "Knowledge is Power",
            subtitle: "Every Successful Career Starts with Good Education",
            color: "bg-black",
        },
        {
            id: 2,
            title: "Learn Without Limits",
            subtitle: "Education opens the door to success",
            color: "bg-emerald-700",
        },
        {
            id: 3,
            title: "Shape Your Future",
            subtitle: "Invest in knowledge, it pays the best interest",
            color: "bg-gray-900",
        },
        {
            id: 4,
            title: "Success Starts Here",
            subtitle: "Empowering students with quality learning",
            color: "bg-blue-900",
        },
    ];

    const [current, setCurrent] = useState(0);

    return (
        <div
            id="bgImg"
            className="w-full h-screen bg-black bg_img text-center flex flex-col justify-center items-center gap-5 px-4"
        >
            {/* Content Section */}
            <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-10">
                    {slides[current].title}
                </h1>
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white">
                    {slides[current].subtitle}
                </h4>

                {/* Button */}
                <a
                    href="#"
                    className="mt-10 w-40 sm:w-48 md:w-52 py-2 px-6 bg-emerald-600 text-white font-semibold rounded-3xl hover:bg-emerald-400 transition-all"
                >
                    Learn More
                </a>
            </div>

            {/* Dots Section */}
            <div className="mt-10 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full border border-emerald-300 cursor-pointer ${current === index ? "bg-emerald-600" : "bg-transparent"
                            }`}
                    ></span>
                ))}
            </div>
        </div>

    )
}

export default Home
