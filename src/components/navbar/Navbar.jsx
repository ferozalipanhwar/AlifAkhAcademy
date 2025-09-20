import React from 'react'
import ListItem from './ListItem'

export default function Navbar() {
    return (
        <nav className='w-[100%] fixed px-20 py-5 flex align-middle justify-between text-white z-40'>
            {/* Logo Section */}
            <div className='flex align-middle gap-3'>
                <img src="./images/logo.png" alt="" />
                <span className='font-semibold mt-1'>ALIF-AKH<span className='text-emerald-500 ms-1'>ACADEMY</span></span>
            </div>
            {/* Menu Section */}
            <div className='flex align-middle justify-between gap-3'>
                <ListItem title={"Home"} />
                <ListItem title={"About Us"} />
                <ListItem title={"Course's"} />
                <ListItem title={"Teacher"} />
                <ListItem title={"Program's"} />
                <ListItem title={"Contact Us"} />
            </div>
        </nav>
    )
}
