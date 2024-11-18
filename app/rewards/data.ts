export const tiers = [
    {
      points: 50,
      imageUrl: "/amazon10.webp",
      label: "$10 Amazon Gift Card (50 points)",
      description: "For use on amazon.com or any affiliated sites.",
    },
    {
      points: 150,
      imageUrl: "/amazon25.webp",
      label: "$25 Amazon Gift Card (150 points)",
      description: "For use on amazon.com or any affiliated sites.",
    },
    {
      points: 250,
      imageUrl: "/algoExpert.png",
      label: "Algo Expert OR NeetCode Premium (250 points)",
      description:
        "Improve your technical interview skills with AlgoExpert or NeetCode Premium.",
    },
    {
      points: 500,
      imageUrl: "/conf.jpg",
      label: "Tech Conference Tickets (500 points)",
      description:
        "Get a free ticket to a tech conference on us. Limited to the first two achievers!",
      special: true, // Mark this tier as special
    },
  ];


export const maxPoints = 570;

export const redemptionDate = new Date("2024-05-17");