import Button from "../../ui/Button";
import Link from "next/link";
function HeroSection() {
  return (
    <div className=" z-[40]  relative overflow-hidden pb-20  ">
      <img
        className="w-full object-cover h-screen     animate-moveWithin    absolute "
        src="/marcy1.jpg"
      ></img>
      <div className="w-full h-full absolute object-cover     bg-white opacity-80"></div>

      <div className="z-[100] relative">
        <h1 className="w-[80%] xl:w-[60%] pt-[5rem]     text-[2.7rem] lg:text-[4rem] md:text-[3.2rem] 865px:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.5rem] m-auto text-center">
          THE MARCY LAB FELLOW REFERRAL PROGRAM
        </h1>
        <p className=" sm:flex  pb-5 w-[70%] sm:w-[60%] lg:w-[50%] text-center pt-5 text-[1rem]    m-auto sm:text-[1.2rem] font-medium">
          {" "}
          Know someone who belongs at Marcy? As a fellow, alum, or staff member,
          refer top talent through the Marcy Lab School Fellow Referral Program.
        </p>
        <div className="m-auto w-[10rem]">
          <Link href='/referral-form'>
          <Button text="START A REFERRAL" />
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
// tsst
