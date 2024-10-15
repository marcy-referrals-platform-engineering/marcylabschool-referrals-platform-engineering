'use client'
import {useState, useEffect} from 'react'

function Hb() { 
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
          window.scrollY > 1? setScrolled(true) : setScrolled(false)
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    } , [])
  return (
    <div className={` [@media(min-width:1245px)]:hidden h-[4.7rem] duration-100  fixed inset-0 w-full ${scrolled? 'bg-[#261f1d]': 'bg-transparent'} `}>
        <div className='flex    w-[80%] m-auto justify-between'>
        <img className={`${ scrolled? 'invert' : ''} duration-100 mt-3  w-[11rem] h-[3.4rem]`} src='/marcylogo2.png'></img>
        <h1 className="text-[2rem] text-center rounded-full   bg-[white] mt-2 bg-opacity-50 border-[3px] border-[#261f1d] w-[3.3rem] h-[3.3rem]">↓</h1>
        </div>
    
    </div>
  )
}

export default Hb