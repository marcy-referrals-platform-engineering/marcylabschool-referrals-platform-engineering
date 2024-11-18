
export const processData = [
  {
    title: "SUBMIT YOUR REFERRAL",
    body: `Fill out the referral form here to start the process. You'll
              be directed to a simple form where you can enter the details
              of the person you'd like to refer to the Marcy Lab School
              Fellowship.`,
    color: "#a6c2b4",
    img: "/Marcy2.jpg",
    step: 1,
    button: { invert: true, text: "SUBMIT A REFERRAL", href: "/referral-form" },
  },

  {
    title: "EARN POINTS",
    body: `You earn points by referring prospects to the Marcy Lab School as they move through different stages, such as scheduling a tour, completing an application, or becoming a fellow. These points can then be exchanged for rewards as you accumulate them.`,
    color: "#c6d7e8",
    img: "/marcy3.jpg",
    step: 2,
    button: {
      invert: true,
      text: "VIEW MILESTONES",
      href: "#referral-milestones",
    },
  },
  {
    title: "REDEEM REWARDS",
    body: `Once you've accumulated enough points, you can redeem them for exclusive rewards. Rewards include Marcy Lab School merchandise, gift cards, and more.`,
    color: "#a6c2b4", // Use any color of your choice
    img: "/marcy7.jpg", // Use an appropriate image for the rewards section
    step: 3, 
    button: { invert: true, text: "VIEW REWARDS", href: '/rewards' },
  },
];