export default function page() {
  return (
    <div className=" bg-gray-100 w-screen h-screen">
      <div className="flex relative justify-center ">
        <img
          className="w-screen rounded absolute  z-[149]  object-[50%_30%]  object-cover h-[13rem]"
          src="fellows1.png"
        ></img>
      </div>

      <div className="w-[60%] mt-[10rem]  relative  border-t-[0.6rem] border-t-[#327a5f] p-5 m-auto z-[150]  bg-white ">
        <h1 className=" font-medium w-[90%] m-auto  border-b mb-2 text-[2rem]">
          {" "}
          MARCY LAB SCHOOL REFERRAL SUBMITION FORM
        </h1>
        <p className="w-[90%] m-auto">
          Help us connect with new talent by submitting a referral. Please
          provide accurate contact details and any helpful information. LinkedIn
          profiles and resumes are encouraged. For more details, check the FAQ
          section.
        </p>
      </div>


      <div className="w-[60%] mt-10 relative    p-5 m-auto z-[150]  bg-white ">
        <h1 className=" font-medium w-[90%] m-auto   mb-2 text-[1.5rem]">
          {" "}
          FULL NAME:
        </h1>
        <p className="w-[70%] mt-10 border-b ml-[5%]">
         
        </p>
      </div>
    </div>
  );
}
