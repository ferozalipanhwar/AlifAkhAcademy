<<<<<<< HEAD
=======
import React, { useState } from 'react'
>>>>>>> 4ef312dc38e86dfa8d637a85fd70e86606c6cf35
import ListItem from './ListItem'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 px-6 sm:px-20 py-4 flex items-center justify-between text-white z-40">

            {/* Logo Section */}
<<<<<<< HEAD
            <div className='flex align-middle gap-2'>
                <img className='size-10 shrink-0' src="./images/logo.svg" alt="" />
                <span className='font-semibold mt-2'>ALIF-AKH<span className='text-emerald-500 ms-1'>ACADEMY</span></span>
            </div>
            {/* Menu Section */}
            <div className='flex align-middle justify-between mt-2  gap-5'>
            
                <ListItem title={"Home"} />
                <ListItem title={"Course's"} />
                <ListItem title={"Teacher"} />
                <ListItem title={"Program's"} />
                  <ListItem title={"About Us"} />
                <ListItem title={"Contact Us"} />
            </div>
            <div className='flex align-middle'>
                <button className='me-7'>Login</button>
                <button className='bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 duration-300'>Register</button>
            </div>
=======
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
>>>>>>> 4ef312dc38e86dfa8d637a85fd70e86606c6cf35
        </nav>
    )
}
