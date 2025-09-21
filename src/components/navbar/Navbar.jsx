import React, { useState } from 'react'
import ListItem from './ListItem'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 px-6 sm:px-20 py-4 flex items-center justify-between text-white z-40">

            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img src="./images/logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-semibold mt-1">
                    ALIF-AKH
                    <span className="text-emerald-500 ms-1">ACADEMY</span>
                </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                <ListItem title={"Home"} />
                <ListItem title={"About"} />
                <ListItem title={"Course's"} />
                <ListItem title={"Teacher"} />
                <ListItem title={"Program's"} />
                <ListItem title={"Contact"} />
            </div>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden flex flex-col gap-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center gap-4 py-6 md:hidden">
                    <ListItem title={"Home"} />
                    <ListItem title={"About Us"} />
                    <ListItem title={"Course's"} />
                    <ListItem title={"Teacher"} />
                    <ListItem title={"Program's"} />
                    <ListItem title={"Contact Us"} />
                </div>
            )}
        </nav>
    )
}
