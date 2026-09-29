export type AttractionCategory =
  | "自然风光"
  | "历史文化"
  | "博物馆"
  | "红色教育"
  | "古镇"
  | "演出"
  | "研学"
  | "其他"
  | "服务";

export type AttractionKind = "景点" | "服务";

export type AttractionRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  slug: string;
  name: string;
  province: string;
  city: string;
  region: string | null;
  category: AttractionCategory;
  kind: AttractionKind;
  description: string;
  duration: string;
  open_hours_note: string;
  seasonal_note: string;
  keywords: string[];
  image_url: string | null;
  image_credit: string;
  image_license_source: string;
  media_asset_id?: string | null;
};

export type AccommodationRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  slug: string;
  name: string;
  city: string;
  district: string;
  star_or_type: string;
  address: string;
  contact: string;
  room_notes: string;
  description: string;
  image_url: string | null;
  media_asset_id?: string | null;
};

export type ItineraryRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  slug: string;
  name: string;
  days_count: number;
  cities: string;
  cover_image_url: string | null;
  summary: string;
  fee_included: string;
  fee_excluded: string;
  cover_media_asset_id?: string | null;
};

export type ItineraryDayRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  itinerary_id: string;
  day_number: number;
  title: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  accommodation_id: string | null;
  lodging_label: string;
  transport: string;
  activities: string;
  notes: string;
};

export type ItineraryDayAttractionRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  itinerary_day_id: string;
  attraction_id: string | null;
  custom_text: string | null;
  show_photo: boolean;
};

export type MediaAssetRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
  sort_order: number;
  bucket: string;
  path: string;
  public_url: string;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  credit: string | null;
  license_source: string | null;
  entity_type: string | null;
  entity_id: string | null;
};

export type AdminActivityRecord = {
  id: string;
  created_at: string;
  actor_email: string | null;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  action: string;
  summary: string;
};

export type ItineraryDayAttractionInput = {
  attraction_id?: string | null;
  custom_text?: string | null;
  show_photo?: boolean;
  sort_order?: number;
};

export type ItineraryDayInput = {
  day_number: number;
  title?: string;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  accommodation_id?: string | null;
  lodging_label?: string;
  transport?: string;
  activities?: string;
  notes?: string;
  attractions?: ItineraryDayAttractionInput[];
};

export type FullItinerary = ItineraryRecord & {
  days: Array<
    ItineraryDayRecord & {
      day_attractions: Array<
        ItineraryDayAttractionRecord & {
          attraction?: AttractionRecord | null;
        }
      >;
      accommodation?: AccommodationRecord | null;
    }
  >;
};

/** Frontend library item shape used by /xingcheng builder */
export type LibraryItem = {
  id: string;
  name: string;
  keywords: string[];
  duration: string;
  description: string;
  kind: AttractionKind;
  image?: string;
  region?: string;
  seasonal?: string;
  province?: string;
  city?: string;
  category?: AttractionCategory;
  openHoursNote?: string;
  imageCredit?: string;
  imageLicenseSource?: string;
  source?: "supabase" | "local";
};
