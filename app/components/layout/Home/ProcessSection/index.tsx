import StepCard from "../../../ui/StepCard";

interface ProcessData {
  img: string;
  color: string;
  body: string;
  title: string;
  step: number;
  button?: { text: string; invert: boolean };
}

function ProcessSection({processData} : {processData: ProcessData[]}) {
  const scrollToMilestones = () => {
    const milestonesSection = document.getElementById("referral-milestones");
    if (milestonesSection) {
      milestonesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" mt-10 w-[90%]    border-t-[0.3rem] m-auto border-t-[#261f1d]">
      <h1 className="text-[2.3rem] lg:text-[2.8rem] xl-[3rem]  md:text-[2.7rem]">
        THE PROCESS 
      </h1>
      <p className=" sm:w-[25rem] md:w-[30rem] pb-10 font-medium">
        Earn points when your referral connects with our recruitment team, tours
        the campus, or submits an application. It’s an easy way to support our
        community and get rewarded along the way.
      </p>
      <div>
        {processData.map(({ img, color, body, title, step, button }) => {
          return (
            <div
              key={title}
              className="border-t-[0.1rem] pb-10 border-t-[#261f1d]"
            >
              <StepCard
                step={step}
                img={img}
                color={color}
                body={body}
                title={title}
                button={button}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessSection;
