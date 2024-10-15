


const links = [
  {text: 'LOG-IN'},
  {text: 'F.A.Q.'},

]
function Sidebar() {
  return (
    <div className="w-[17rem] relative  min-h-full  bg-[#261f1d]">
      <div className='py-6 fixed ml-8 '>

      <img className="w-[12rem] m-auto mb-4 border-b-white border-b" src='/marcylogo1.png'></img>
      <ul>
        {
          links.map((link) => {
            return <li className="group cursor-pointer"><p className=' pb-3 text-white  duration-200 text-[1.5rem]'>{link.text}<span className="group-hover:opacity-100 duration-300 group-hover:pl-1 opacity-0">→</span></p></li>
          }) 
        }
      </ul>
      </div>
      

     
    </div>
  )
}

export default Sidebar