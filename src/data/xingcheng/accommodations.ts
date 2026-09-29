import type { AccommodationRecord } from "@/lib/xingcheng/types";
import { fallbackLodgingCityOptions } from "@/data/xingcheng/library";

/** City-label lodging options preserved as fallback accommodations. */
export const fallbackAccommodations: AccommodationRecord[] = fallbackLodgingCityOptions
  .filter((city) => city !== "不住宿")
  .map((city, index) => ({
    id: `local-lodging-${city}`,
    published: true,
    sort_order: index + 1,
    slug: `city-${city}`,
    name: city,
    city,
    district: "",
    star_or_type: "城市住宿",
    address: "",
    contact: "",
    room_notes: "",
    description: `${city}当地住宿（本地兜底数据）`,
    image_url: null,
  }));

export const NO_LODGING_LABEL = "不住宿";

export const fallbackLodgingLabels = [...fallbackLodgingCityOptions];
