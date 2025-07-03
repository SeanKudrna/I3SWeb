/**
 * Type definitions for Etsy API v3 responses
 */

export interface EtsyShop {
  shop_id: number;
  shop_name: string;
  title: string;
  announcement: string;
  currency_code: string;
  is_vacation: boolean;
  vacation_message: string | null;
  sale_message: string | null;
  digital_sale_message: string | null;
  listing_active_count: number;
  digital_listing_count: number;
  login_name: string;
  accepts_custom_requests: boolean;
  policy_welcome: string | null;
  policy_payment: string | null;
  policy_shipping: string | null;
  policy_refunds: string | null;
  policy_additional: string | null;
  policy_updated_tsz: number;
  policy_has_private_receipt_info: boolean;
  has_unstructured_policies: boolean;
  policy_privacy: string | null;
  vacation_autoreply: string | null;
  image_url_760x100: string | null;
  num_favorers: number;
  languages: string[];
  icon_url_fullxfull: string | null;
  is_using_structured_policies: boolean;
  has_onboarded_structured_policies: boolean;
  include_dispute_form_link: boolean;
  is_direct_checkout_onboarded: boolean;
  is_etsy_payments_onboarded: boolean;
  is_opted_in_to_buyer_promise: boolean;
  is_calculated_eligible: boolean;
  is_in_us: boolean;
  transaction_sold_count: number;
  shipping_from_country_iso: string;
  shop_location_country_iso: string;
  review_count: number | null;
  review_average: number | null;
}

export interface EtsyListing {
  listing_id: number;
  user_id: number;
  shop_id: number;
  title: string;
  description: string;
  state: string;
  creation_timestamp: number;
  created_timestamp: number;
  ending_timestamp: number;
  original_creation_timestamp: number;
  last_modified_timestamp: number;
  updated_timestamp: number;
  state_timestamp: number;
  quantity: number;
  shop_section_id: number | null;
  featured_rank: number;
  url: string;
  num_favorers: number;
  non_taxable: boolean;
  is_taxable: boolean;
  is_customizable: boolean;
  is_personalizable: boolean;
  personalization_is_required: boolean;
  personalization_char_count_max: number | null;
  personalization_instructions: string | null;
  listing_type: string;
  tags: string[];
  materials: string[];
  shipping_profile_id: number;
  return_policy_id: number | null;
  processing_min: number;
  processing_max: number;
  who_made: string;
  when_made: string;
  is_supply: boolean;
  is_private: boolean;
  is_digital: boolean;
  file_data: string;
  has_variations: boolean;
  should_auto_renew: boolean;
  language: string;
  price: EtsyMoney;
  taxonomy_id: number;
  production_partners: string[];
  skus: string[];
  views: number;
  item_weight: number | null;
  item_weight_unit: string | null;
  item_length: number | null;
  item_width: number | null;
  item_height: number | null;
  item_dimensions_unit: string | null;
  is_vintage: boolean;
  video_count: number;
  video_url: string | null;
}

export interface EtsyMoney {
  amount: number;
  divisor: number;
  currency_code: string;
}

export interface EtsyListingImage {
  listing_id: number;
  listing_image_id: number;
  hex_code: string | null;
  red: number | null;
  green: number | null;
  blue: number | null;
  hue: number | null;
  saturation: number | null;
  brightness: number | null;
  is_black_and_white: boolean | null;
  creation_tsz: number;
  created_timestamp: number;
  rank: number;
  url_75x75: string;
  url_170x135: string;
  url_570xN: string;
  url_fullxfull: string;
  full_height: number;
  full_width: number;
  alt_text: string | null;
}

export interface EtsyListingInventory {
  products: EtsyListingProduct[];
  price_on_property: number[];
  quantity_on_property: number[];
  sku_on_property: number[];
}

export interface EtsyListingProduct {
  product_id: number;
  sku: string;
  is_deleted: boolean;
  offerings: EtsyListingOffering[];
  property_values: EtsyPropertyValue[];
}

export interface EtsyListingOffering {
  offering_id: number;
  quantity: number;
  is_enabled: boolean;
  is_deleted: boolean;
  price: EtsyMoney;
}

export interface EtsyPropertyValue {
  property_id: number;
  property_name: string;
  scale_id: number | null;
  scale_name: string | null;
  value_ids: number[];
  values: string[];
}

export interface EtsyReview {
  shop_id: number;
  listing_id: number;
  rating: number;
  review: string | null;
  language: string;
  image_url_fullxfull: string | null;
  create_timestamp: number;
  created_timestamp: number;
  update_timestamp: number;
  updated_timestamp: number;
}

export interface EtsyShippingProfile {
  shipping_profile_id: number;
  title: string;
  user_id: number;
  min_processing_days: number;
  max_processing_days: number;
  processing_days_display_label: string;
  origin_country_iso: string;
  origin_postal_code: string;
  profile_type: string;
  domestic_handling_fee: number;
  international_handling_fee: number;
}

export interface EtsyUser {
  user_id: number;
  primary_email: string | null;
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
  create_timestamp: number;
  created_timestamp: number;
  birth_month: number | null;
  birth_day: number | null;
  is_seller: boolean;
  bio: string | null;
  gender: string | null;
  location: string | null;
  transaction_buy_count: number;
  transaction_sold_count: number;
}

export interface EtsyApiResponse<T> {
  count: number;
  results: T[];
}

export interface EtsyListingVariation {
  property_id: number;
  value_id: number;
  formatted_name: string;
  formatted_value: string;
}

export interface EtsyShopSection {
  shop_section_id: number;
  title: string;
  rank: number;
  user_id: number;
  active_listing_count: number;
}

export interface EtsyCategory {
  id: number;
  level: number;
  name: string;
  parent_id: number | null;
  parent_name: string | null;
  path: string;
  taxonomy_id: number;
  children_ids: number[];
}

export interface EtsySearchFilters {
  min_price?: number;
  max_price?: number;
  color?: string;
  color_accuracy?: number;
  tags?: string[];
  materials?: string[];
  shop_section_ids?: number[];
  custom_only?: boolean;
  location?: string;
  lat?: number;
  lon?: number;
  region?: string;
  explicit?: boolean;
  limit?: number;
  offset?: number;
  sort_on?: 'created' | 'price' | 'updated' | 'score';
  sort_order?: 'asc' | 'desc' | 'up' | 'down';
  includes?: string[];
}

export interface EtsyError {
  error: string;
  error_description?: string;
}

export interface ProcessedListing extends EtsyListing {
  images: EtsyListingImage[];
  inventory?: EtsyListingInventory;
  variations?: EtsyListingVariation[];
  displayPrice: string;
  primaryImage?: EtsyListingImage;
}