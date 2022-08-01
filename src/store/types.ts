export type Model = {
  name?: string;
  title?: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  original_language: string;
  production_countries: { name: string }[];
  production_companies: { name: string }[];
};

export type Cast = {
  id: number;
  name: string;
  profile_path: string;
};

export type Video = {
  id: number;
  results: { id: string; key: string }[];
};

export type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  original_language: string;
};
