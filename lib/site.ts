export const siteConfig = {
  name: "Wanderlast",
  tagline: "Discover the world, your way",
  description:
    "Wanderlast is a full-service travel agency crafting curated journeys to the world's most unforgettable places — handpicked stays, expert local guides, and support every step of the way.",
  links: {
    email: "hello@wanderlast.com",
    phone: "+1 (555) 018-2245",
    address: "418 Harbor Street, Portland, OR 97205",
  },
} as const

export type Destination = {
  slug: string
  name: string
  country: string
  category: string
  description: string
  price: number
  duration: string
  rating: number
  reviews: number
  image: string
}

export const mainNav = [
  { title: "Destinations", href: "#destinations" },
  { title: "Why us", href: "#why-wanderlast" },
  { title: "Reviews", href: "#reviews" },
  { title: "Contact", href: "#contact" },
] as const

export const features = [
  {
    title: "Curated by real travelers",
    description:
      "Every itinerary is scouted and slept in by our team before it ever reaches you. No filler, no tourist traps.",
    icon: "/assets/MapTrifold.png",
  },
  {
    title: "Safe & fully protected",
    description:
      "ATOL-protected bookings, vetted partners and 24/7 on-the-ground assistance wherever you land.",
    icon: "/assets/ShieldCheck.png",
  },
  {
    title: "Support that never sleeps",
    description:
      "A real human answers in under two minutes — before, during and long after your trip.",
    icon: "/assets/Headset.png",
  },
] as const

export const destinations: Destination[] = [
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    category: "Ruins & mountains",
    description: "Sunrise over the Andes from the Sun Gate.",
    price: 1450,
    duration: "8 days",
    rating: 4.9,
    reviews: 312,
    image: "/assets/destinations/image3.png",
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    category: "Beaches & islands",
    description: "Powder sand, reef breaks and endless blue.",
    price: 2180,
    duration: "6 days",
    rating: 4.8,
    reviews: 268,
    image: "/assets/destinations/image2.png",
  },
  {
    slug: "bora-bora",
    name: "Bora Bora",
    country: "French Polynesia",
    category: "Overwater villas",
    description: "Wake up above a turquoise lagoon.",
    price: 2640,
    duration: "7 days",
    rating: 4.9,
    reviews: 194,
    image: "/assets/destinations/image5.png",
  },
  {
    slug: "sapa",
    name: "Sapa",
    country: "Vietnam",
    category: "Valleys & treks",
    description: "Rice terraces, hammocks and mountain air.",
    price: 980,
    duration: "9 days",
    rating: 4.8,
    reviews: 156,
    image: "/assets/destinations/image4.png",
  },
  {
    slug: "turks-and-caicos",
    name: "Turks & Caicos",
    country: "Caribbean",
    category: "Coastlines",
    description: "The clearest water you will ever swim in.",
    price: 1720,
    duration: "5 days",
    rating: 4.7,
    reviews: 221,
    image: "/assets/destinations/image6.png",
  },
  {
    slug: "arizona",
    name: "Arizona",
    country: "United States",
    category: "Deserts & canyons",
    description: "Saguaro silhouettes over a desert lake.",
    price: 890,
    duration: "5 days",
    rating: 4.7,
    reviews: 143,
    image: "/assets/destinations/image1.png",
  },
]

export const testimonials = [
  {
    name: "Amara Whitfield",
    role: "Traveled to Peru",
    quote:
      "They rebuilt our whole route in one phone call when a strike closed the valley. We never felt alone for a second.",
    image: "/assets/person1.png",
  },
  {
    name: "Daniel Okonkwo",
    role: "Traveled to Vietnam",
    quote:
      "I have booked a dozen trips through Wanderlast and the pacing is always right. It never feels like a package.",
    image: "/assets/person2.png",
  },
] as const

export const stats = [
  { value: "12k+", label: "Trips planned" },
  { value: "68", label: "Countries" },
  { value: "4.9/5", label: "Average rating" },
  { value: "24/7", label: "Human support" },
] as const

export const footerNav = [
  {
    title: "Explore",
    links: [
      { title: "Destinations", href: "#destinations" },
      { title: "Why Wanderlast", href: "#why-wanderlast" },
      { title: "Reviews", href: "#reviews" },
      { title: "Plan a trip", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About us", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Press", href: "#" },
      { title: "Partners", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Help center", href: "#" },
      { title: "Booking terms", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Cookies", href: "#" },
    ],
  },
] as const
