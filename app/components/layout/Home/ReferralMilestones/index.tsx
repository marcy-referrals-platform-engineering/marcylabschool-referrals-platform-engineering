import Milestone from "../../../ui/Milestone";
import { pointsData } from "./data";

export default function ReferralMilestones() {
  return (
    <div id="referral-milestones" className="  relative mt-12 w-full">
      <img
        src="/marcy5.jpg"
        className="absolute opacity-20 top-0 left-0 w-full h-full object-cover grayscale "
        alt="Description of image"
      />
      <div></div>
      <div className="bg-primary2 absolute w-full h-full opacity-70 "></div>
      <div className="relative z-10 w-[90%] pb-10 m-auto pt-5">
        <h1 className="text-[2.3rem] lg:text-[2.8rem] xl-[3rem]  md:text-[2.7rem]">
          REFERRAL MILESTONES
        </h1>
        <p className="font-medium">
          Curious about how to rack up those referral points?
        </p>
      </div>
      <div className="pb-5 ">
        {pointsData.map((milestone) => {
          return <Milestone key={milestone.action} milestone={milestone} />;
        })}
      </div>
    </div>
  );
}
