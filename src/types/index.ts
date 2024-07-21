export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string; // URL to character's image
  episode: string[]; // Array of URLs to episodes
  url: string; // URL to character's own endpoint
  created: string; // Time character was created in the database
}


export interface ApiEndpoints {
    characters: string; // URL to characters endpoint
    locations: string; // URL to locations endpoint
    episodes: string; // URL to episodes endpoint
  }




export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[]; // Array of URLs to residents
    url: string; // URL to location's own endpoint
    created: string; // Time location was created in the database
  }

  

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[]; // Array of URLs to characters in the episode
    url: string; // URL to episode's own endpoint
    created: string; // Time episode was created in the database
  }
  


export interface PaginationInfo {
    count: number; // Total count of items
    pages: number; // Total number of pages
    next: string | null; // URL to the next page or null if no next page
    prev: string | null; // URL to the previous page or null if no previous page
  }

export interface PaginationResponse<T> {
    info: PaginationInfo;
    results: T;
  }
  
export interface MultipleDataResponse<T> {
  results: T;
}
