export type HotelRate = { roomRate: number; nights: number };

/** Twin-share basis; odd groups can use triples, so never round up room counts. */
export function calculateHotelCosts(hotels: HotelRate[], travelers: number) {
  const perPerson = hotels.reduce((sum, hotel) => sum + hotel.roomRate * hotel.nights / 2, 0);
  return { perPerson, total: perPerson * travelers, singleSupplement: perPerson };
}
