export type SubdivisionMeta = {
  code: string;        // ISO 3166-2 (e.g. "US-CA") or fallback ID
  name: string;
  typeLabel: string;   // "State", "Province", "Prefecture", etc.
  isDisputed?: boolean;
};

export type CountrySubdivisionMeta = {
  countryCode: string;
  pluralLabel: string; // "States", "Provinces", "Regions", etc.
  divisions: SubdivisionMeta[];
};

export type SubdivisionGeoFeature = {
  type: "Feature";
  properties: {
    name: string;
    name_en?: string;
    iso_3166_2?: string;
    type_en?: string;
    type?: string;
    /** True for features merged from a territory GeoJSON file (not the parent country's own admin-1 data). */
    _isTerritory?: boolean;
  };
  geometry: unknown;
};

export type SubdivisionFeatureCollection = {
  type: "FeatureCollection";
  features: SubdivisionGeoFeature[];
};
