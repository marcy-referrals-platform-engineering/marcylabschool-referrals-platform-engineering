import StepCard from "../ui/StepCard"


const processData = [
    {
      title: "SUBMIT YOUR REFERAL",
      body: `Fill out the referral form here to start the process. You'll
              be directed to a simple form where you can enter the details
              of the person you'd like to refer to the Marcy Lab School
              Fellowship.`,
      color: "#a6c2b4",
      img: "/marcy2.jpg",
      step: 1,
      button: {invert: true, text: 'SUBMIT A REFERRAL'}
    },
  
  
    {
      title: "EARN POINTS",
      body: `You earn points by referring prospects to the Marcy Lab School as they move through different stages, such as scheduling a tour, completing an application, or becoming a fellow. These points can then be exchanged for rewards as you accumulate them.`,
      color: '#c6d7e8',
      img: 'marcy3.jpg',
      step: 2,
      button: {invert: true, text: 'VIEW MILESTONES'}
    },
    {
        title: "REDEEM REWARDS",
        body: `Once you've accumulated enough points, you can redeem them for exclusive rewards. Rewards include Marcy Lab School merchandise, gift cards, and more.`,
        color: '#a6c2b4',  // Use any color of your choice
        img: 'marcy7.jpg',  // Use an appropriate image for the rewards section
        step: 3,
        button: {invert: true, text: 'VIEW REWARDS'}
      }
  ];
  
function ProcessSection() {
  return (
    <div className="  mt-10 w-[90%]   border-t-[0.3rem] m-auto border-t-[#261f1d]">
    <h1 className='text-[2.3rem] lg:text-[2.8rem] xl-[3rem]  md:text-[2.7rem]'>THE PROCESS</h1>
    <p className=" sm:w-[25rem] md:w-[30rem] pb-10 font-medium">
      {" "}
      Earn points when your referral connects with our recruitment team,
      tours the campus, or submits an application. It’s an easy way to
      support our community and get rewarded along the way.
    </p>
    <div>
      {processData.map(({ img, color, body, title, step, button }) => {
        return (
          <div className="border-t-[0.1rem] pb-10 border-t-[#261f1d]">
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
  )
}

export default ProcessSection