import ListItem from './ListItem'

export default function Navbar() {
    return (
        <nav className='w-[100%] fixed px-20 py-5 flex align-middle justify-between text-white z-40'>
            {/* Logo Section */}
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
        </nav>
    )
}
