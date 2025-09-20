import React, { useState } from 'react'
import '../../style/home.css'
const Home = () => {


    return (
        <div id='bgImg' className='w-[100%] h-[100vh] bg-black bg_img text-center flex align-middle justify-center flex-col gap-2 '>
            <div className='w-[100%] h-[80%] relative flex flex-col justify-center align-middle gap-5'>
                <h1 className='text-7xl font-bold text-white z-10'>Knowledge is Power</h1>
                <h4 className='text-2xl text-white'>Every Successful career starts with good education </h4>
                <a href="" className='w-[10%] py-2 px-4 absolute top-[80%] left-[45%] translate-[-50px,-50px] bg-emerald-600 font-semibold rounded-3xl hover:bg-emerald-300 '>Learn More</a>

            </div>
            <div className='w-[100%] flex align-middle justify-center border-amber-200 gap-3'>
                <span className='w-3 h-3 border-1 rounded-lg border-emerald-300 cursor-pointer active:bg-emerald-600 active'></span>
                <span className='w-3 h-3 border-1 rounded-lg border-emerald-300 cursor-pointer active:bg-emerald-600'></span>
                <span className='w-3 h-3 border-1 rounded-lg border-emerald-300 cursor-pointer active:bg-emerald-600'></span>
                <span className='w-3 h-3 border-1 rounded-lg border-emerald-300 cursor-pointer active:bg-emerald-600'></span>
            </div>
        </div>
    )
}

export default Home
