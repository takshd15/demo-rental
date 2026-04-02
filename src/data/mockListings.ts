export type RentalType = "sublet" | "full";

export type Listing = {
  id: string;
  title: string;
  location: string;
  address: string;
  pricePerNight: number;
  currency: string;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  rentalType: RentalType;
  wifi: boolean;
  furnished: boolean;
  host: {
    name: string;
    verified: boolean;
    memberSince: string;
    languages: string[];
    phone: string;
  };
  units: {
    id: string;
    title: string;
    sizeSqm: number;
    guests: number;
    rating: number;
    amenities: string[];
    pricePerNight: number;
    thumbnail: string;
  }[];
};

const img = (seed: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** Safe card image — never empty */
export function listingHeroImage(listing: Pick<Listing, "id" | "image">): string {
  if (listing.image?.trim()) return listing.image;
  const fallbacks = [
    "photo-1560448204-e02f11c3d0e2",
    "photo-1522708323590-d24db4246d14",
    "photo-1502672260266-1c1ef2d93688",
  ];
  const i = Math.abs(listing.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % fallbacks.length;
  return img(fallbacks[i], 800, 600);
}

export const mockListings: Listing[] = [
  {
    id: "villa-korcula",
    title: "Villa Korčula Supreme",
    location: "Korčula, Croatia",
    address: "Brune Bušića 118, Korčula",
    pricePerNight: 530,
    currency: "EUR",
    description:
      "A refined waterfront villa with panoramic Adriatic views, private terrace, and designer interiors. Perfect for families or small groups seeking calm luxury steps from the old town.",
    image: img("photo-1582268611958-ebfd161ef9cf"),
    images: [
      img("photo-1582268611958-ebfd161ef9cf", 1200, 900),
      img("photo-1600596542815-27b88e50e6e0", 600, 600),
      img("photo-1600585154340-be6161a56a0c", 600, 600),
      img("photo-1564013799919-ab600027ffc6", 600, 600),
      img("photo-1600047509807-ba8f99e2d009", 600, 600),
    ],
    rating: 5,
    reviewCount: 1,
    rentalType: "full",
    wifi: true,
    furnished: true,
    host: {
      name: "Marin Horvat",
      verified: true,
      memberSince: "2015",
      languages: ["HR", "EN", "DE", "IT"],
      phone: "+385 9576 7942",
    },
    units: [
      {
        id: "studio-one",
        title: "Studio One",
        sizeSqm: 32,
        guests: 2,
        rating: 5,
        amenities: ["AC", "TV", "Bath", "Terrace", "Wi‑Fi", "More"],
        pricePerNight: 530,
        thumbnail: img("photo-1522708323590-d24db4246d14", 400, 400),
      },
    ],
  },
  {
    id: "loft-lisbon",
    title: "Sunlit Loft Alfama",
    location: "Lisbon, Portugal",
    address: "R. Remédios 42, Alfama",
    pricePerNight: 189,
    currency: "EUR",
    description:
      "Bright loft with terracotta tones, river glimpses, and walking distance to miradouros. Ideal for couples who want character and quiet nights.",
    image: img("photo-1502672260266-1c1ef2d93688"),
    images: [
      img("photo-1502672260266-1c1ef2d93688", 1200, 900),
      img("photo-1524758631624-e2822e304c36", 600, 600),
      img("photo-1493809842364-78817add7ffb", 600, 600),
      img("photo-1502005229762-cf1b431da7d6", 600, 600),
      img("photo-1560448204-e02f11c3d0e2", 600, 600),
    ],
    rating: 4.9,
    reviewCount: 28,
    rentalType: "full",
    wifi: true,
    furnished: true,
    host: {
      name: "Sofia Mendes",
      verified: true,
      memberSince: "2018",
      languages: ["PT", "EN", "ES"],
      phone: "+351 912 000 441",
    },
    units: [
      {
        id: "loft-main",
        title: "Main loft",
        sizeSqm: 48,
        guests: 3,
        rating: 5,
        amenities: ["AC", "Kitchen", "Wi‑Fi", "Workspace", "Washer"],
        pricePerNight: 189,
        thumbnail: img("photo-1502672260266-1c1ef2d93688", 400, 400),
      },
    ],
  },
  {
    id: "cabin-tyrol",
    title: "Alpine Cabin — Tyrol",
    location: "Innsbruck area, Austria",
    address: "Ötztalstraße 12",
    pricePerNight: 245,
    currency: "EUR",
    description:
      "Wood-forward cabin with sauna, wide decks, and mountain silence. Ski-in friendly in season; summer trails at the door.",
    image: img("photo-1518780664697-55e3ad937233"),
    images: [
      img("photo-1518780664697-55e3ad937233", 1200, 900),
      img("photo-1449156497586-7fce0f282e1e", 600, 600),
      img("photo-1470252649378-9c29740c9fa8", 600, 600),
      img("photo-1506905925346-21bda4d32df4", 600, 600),
      img("photo-1464822759023-fed622ff2c3b", 600, 600),
    ],
    rating: 4.85,
    reviewCount: 41,
    rentalType: "full",
    wifi: true,
    furnished: true,
    host: {
      name: "Thomas Weber",
      verified: true,
      memberSince: "2016",
      languages: ["DE", "EN"],
      phone: "+43 664 882 1020",
    },
    units: [
      {
        id: "cabin-whole",
        title: "Entire cabin",
        sizeSqm: 72,
        guests: 5,
        rating: 5,
        amenities: ["Sauna", "Fireplace", "Parking", "Wi‑Fi", "Kitchen"],
        pricePerNight: 245,
        thumbnail: img("photo-1518780664697-55e3ad937233", 400, 400),
      },
    ],
  },
  {
    id: "room-berlin",
    title: "Bright room in Neukölln",
    location: "Berlin, Germany",
    address: "Sonnenallee 48",
    pricePerNight: 62,
    currency: "EUR",
    description:
      "Quiet room in a shared flat near the canal. Great for students or remote workers who want culture on their doorstep.",
    image: img("photo-1554995207-c18c203602cb"),
    images: [img("photo-1554995207-c18c203602cb", 1200, 900), img("photo-1484154218962-a1c002085d2f", 600, 600)],
    rating: 4.75,
    reviewCount: 16,
    rentalType: "sublet",
    wifi: true,
    furnished: true,
    host: {
      name: "Lena Vogt",
      verified: true,
      memberSince: "2019",
      languages: ["DE", "EN"],
      phone: "+49 151 2240 8891",
    },
    units: [
      {
        id: "room-a",
        title: "Room A",
        sizeSqm: 14,
        guests: 1,
        rating: 5,
        amenities: ["Wi‑Fi", "Desk", "Shared kitchen"],
        pricePerNight: 62,
        thumbnail: img("photo-1554995207-c18c203602cb", 400, 400),
      },
    ],
  },
  {
    id: "apartment-ams",
    title: "Canal-side apartment",
    location: "Amsterdam, Netherlands",
    address: "Prinsengracht 102",
    pricePerNight: 275,
    currency: "EUR",
    description:
      "Two-floor apartment with canal views. Unfurnished except kitchen; ideal if you are bringing your own style.",
    image: img("photo-1501183638710-841dd1904471"),
    images: [img("photo-1501183638710-841dd1904471", 1200, 900), img("photo-1522337360788-8b13dee7a37e", 600, 600)],
    rating: 4.82,
    reviewCount: 9,
    rentalType: "full",
    wifi: true,
    furnished: false,
    host: {
      name: "Daan Jansen",
      verified: true,
      memberSince: "2017",
      languages: ["NL", "EN"],
      phone: "+31 6 1234 8890",
    },
    units: [
      {
        id: "apt-whole",
        title: "Entire apartment",
        sizeSqm: 65,
        guests: 4,
        rating: 5,
        amenities: ["Kitchen", "Wi‑Fi", "Elevator"],
        pricePerNight: 275,
        thumbnail: img("photo-1501183638710-841dd1904471", 400, 400),
      },
    ],
  },
];

export function getListingById(id: string): Listing | undefined {
  return mockListings.find((l) => l.id === id);
}
