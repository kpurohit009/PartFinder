# this is with some changes 
- 1st 
https://play.tailwindcss.com/dv5bTBvvHG

- sidebar 
https://play.tailwindcss.com/ZszfXsLfJR

- nav
  https://play.tailwindcss.com/2v8U4PetGu

- hero section
  https://play.tailwindcss.com/dsahLEmAU1

- stats 
 https://play.tailwindcss.com/GXAaZ3vUws

- cards
  https://play.tailwindcss.com/Alew9yY9mv

- footer
  https://play.tailwindcss.com/hEQzUHX2IG




-navbar
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex items-center justfify-between md:justify-center mt-2'>
            <ul className='flex items-center justify-center font-semibold'>
                <li className='relative group px-3 py-2'>
                    <a href='#' className='hover:opacity-50 cursor-pointer'>Home</a>
                </li>
                <li className='relative group px-3 py-2'>
                    <a href='#' className='hover:opacity-50 cursor-pointer'>Products</a>
                </li>
                <li className='relative group px-3 py-2'>
                    <a href='#' className='hover:opacity-50 cursor-pointer'>Guides</a>
                </li>
                <li className='relative group px-3 py-2'>
                    <a href='#' className='hover:opacity-50 cursor-pointer'>Complete Builds</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
