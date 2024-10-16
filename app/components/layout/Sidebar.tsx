'use client'

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const links = [
  { text: 'LOG-IN', onClick: () => signIn('google') }, // Pass the provider directly
  { text: 'F.A.Q.' },
]

const Sidebar = () => {
  const { data: session } = useSession(); // Correct variable name should be 'session'
  useEffect(() => {
    console.log(session)
  })
  return (
    <div className="w-[17rem] relative  min-h-full  bg-[#261f1d]">
      <div className='py-6 fixed ml-8 '>
        <img className="w-[12rem] m-auto mb-4 border-b-white border-b" src='/marcylogo1.png' alt="Logo" />
        <ul>
          {
            links.map((link, index) => (
              <li 
                key={index}
                onClick={link.onClick} 
                className="group cursor-pointer"
              >
                <p className='pb-3 text-white duration-200 text-[1.5rem]'>
                  {link.text}
                  <span className="group-hover:opacity-100 duration-300 group-hover:pl-1 opacity-0">→</span>
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;