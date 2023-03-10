export interface Game {
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshots>;
  trailers: Array<Trailer>;
  platforms: Array<Platform>;
  developers: Array<Developers>;
  achievements: Array<Achievements>;
  stores_url: Array<Stores>;
}

export interface APIResponse<T> {
  results: Array<T>;
  next: string;
  previous: string;
  count: number;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: { name: string };
}

interface Developers {
  name: string;
}

interface Platform {
  platform: { name: string };
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshots {
  image: string;
}

interface Trailer {
  data: { max: string };
}

interface Achievements {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Stores {
  id: number;
  game_id: number;
  store_id: number;
  url: string;
}
