interface MilestoneProps {
    milestone: {
        action: string;
        details: string;
        points: number;
    };
}

export default function Milestone({milestone}: MilestoneProps) {
  return (
    <div className="relative  z-10 w-[90%] m-auto py-5 border-t-[#261f1d] flex gap-3 justify-between border-t-[0.1rem]">
              <div>
                <h1 className=" w-[12rem] sm:w-[25rem]  font-medium  text-[1.3rem] md:text-[1.8rem] lg:text-[1.8rem] sm:text-[1.6rem]  ">
                  {milestone.action}
                </h1>
                <p className="w-[12rem] hidden sm:flex sm:w-[20rem] text-[0.8rem] md:text-[1rem] font-medium ">
                  {milestone.details}
                </p>
              </div>
              <h1 className="text-[1.8rem] md:text-[2.3rem] lg:text-[2.7rem]">
                →
              </h1>
              <h1 className="text-[1.3rem] md:text-[1.8rem] lg:text-[1.8rem] sm:text-[1.6rem]  font-medium">
                {milestone.points} PTS
              </h1>
            </div>
  )
}
