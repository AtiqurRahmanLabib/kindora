export type Opportunity = {
    _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: number;
  totalSpots: number;
  price: string;
  verifiedOrganizer: boolean;
  details: {
    heading: string;
    about: string;
    impactTitle: string;
    impactDescription: string;
    whatToBring: string[];
  };
};
