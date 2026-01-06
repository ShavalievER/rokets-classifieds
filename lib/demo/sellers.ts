export type Seller = {
  id: string;
  name: string;
  avatar: string; // url
  location: string; // Dubai, Sharjah...
  address: string; // Detailed address
  rating: number; // 4.2
  reviews: number; // 38
  memberSince: string; // 2023
  responseTime: string; // "Typically replies in 10 min"
  completedDeals: number;
  phone?: string; // Contact phone
  email?: string; // Contact email
};

export const SELLERS: Seller[] = [
  {
    id: "sara",
    name: "Sara M.",
    avatar: "https://i.pravatar.cc/160?img=5",
    location: "Dubai",
    address: "Villa 12, Al Barsha South, Dubai Marina, Dubai, UAE",
    rating: 4.8,
    reviews: 63,
    memberSince: "2022",
    responseTime: "Typically replies in 15 min",
    completedDeals: 41,
    phone: "+971 50 123 4567",
    email: "sara.m@example.com"
  },
  {
    id: "ahmed",
    name: "Ahmed K.",
    avatar: "https://i.pravatar.cc/160?img=12",
    location: "Sharjah",
    address: "Building 45, Al Qasimia, King Faisal Street, Sharjah, UAE",
    rating: 4.6,
    reviews: 28,
    memberSince: "2023",
    responseTime: "Typically replies in 1 hour",
    completedDeals: 19,
    phone: "+971 55 234 5678",
    email: "ahmed.k@example.com"
  },
  {
    id: "maria",
    name: "Maria S.",
    avatar: "https://i.pravatar.cc/160?img=47",
    location: "Abu Dhabi",
    address: "Apartment 301, Al Khalidiyah, Corniche Road, Abu Dhabi, UAE",
    rating: 4.9,
    reviews: 91,
    memberSince: "2021",
    responseTime: "Typically replies in 10 min",
    completedDeals: 58,
    phone: "+971 50 345 6789",
    email: "maria.s@example.com"
  },
  {
    id: "yousef",
    name: "Yousef A.",
    avatar: "https://i.pravatar.cc/160?img=32",
    location: "Ajman",
    address: "Villa 8, Al Nuaimiya, Sheikh Rashid Bin Humaid Street, Ajman, UAE",
    rating: 4.5,
    reviews: 17,
    memberSince: "2024",
    responseTime: "Typically replies in 2 hours",
    completedDeals: 12,
    phone: "+971 55 456 7890",
    email: "yousef.a@example.com"
  },
  {
    id: "fatima",
    name: "Fatima R.",
    avatar: "https://i.pravatar.cc/160?img=9",
    location: "RAK",
    address: "Building 23, Al Qawasim, Al Qasr Street, Ras Al Khaimah, UAE",
    rating: 4.7,
    reviews: 22,
    memberSince: "2023",
    responseTime: "Typically replies in 30 min",
    completedDeals: 16,
    phone: "+971 50 567 8901",
    email: "fatima.r@example.com"
  }
];

export function getSellerById(id: string) {
  return SELLERS.find((s) => s.id === id) ?? SELLERS[0];
}
