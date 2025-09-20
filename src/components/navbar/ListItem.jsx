import React from 'react'

const ListItem = ({ title }) => {
    return (
        <ul className='flex align-middle justify-between gap-3'>
            <li className='font-semibold'>
                <a href="" className='hover:border-b-2 hover:text-emerald-500 hover:pb-1 hover:transition-all'>{title}</a>
            </li>
        </ul>
    )
}

export default ListItem
