export type SubdivisionMeta = {
  code: string;        // ISO 3166-2 (e.g. "US-CA") or fallback ID
  name: string;
  typeLabel: string;   // "State", "Province", "Prefecture", etc.
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
  };
  geometry: unknown;
};

export type SubdivisionFeatureCollection = {
  type: "FeatureCollection";
  features: SubdivisionGeoFeature[];
};
