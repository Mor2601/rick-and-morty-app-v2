import {
    Character,
    Location,
    Episode,
    PaginationResponse,
   
  } from "../types";
  
  /**
   * Type guard for Character
   * check if the response is a character
   * @param data 
   * @returns 
   */
  export const isCharacter = (data: any): data is Character => {
    return data && 
      typeof data.id === 'number' &&
      typeof data.name === 'string' &&
      ['Alive', 'Dead', 'unknown'].includes(data.status) &&
      typeof data.species === 'string' &&
      typeof data.type === 'string' &&
      ['Female', 'Male', 'Genderless', 'unknown'].includes(data.gender) &&
      data.origin && typeof data.origin.name === 'string' &&
      data.location && typeof data.location.name === 'string' &&
      typeof data.image === 'string' &&
      Array.isArray(data.episode) &&
      typeof data.url === 'string' &&
      typeof data.created === 'string';
  };
  
  /**
   * Type guard for Location
   * check if the response is a location
   * @param data 
   * @returns 
   */
  export const isLocation = (data: any): data is Location => {
    return data &&
      typeof data.id === 'number' &&
      typeof data.name === 'string' &&
      typeof data.type === 'string' &&
      typeof data.dimension === 'string' &&
      Array.isArray(data.residents) &&
      typeof data.url === 'string' &&
      typeof data.created === 'string';
  };
  
  /**
   * Type guard for Episode
   * check if the response is an episode
   * @param data 
   * @returns
  */
  export const isEpisode = (data: any): data is Episode => {
    return data &&
      typeof data.id === 'number' &&
      typeof data.name === 'string' &&
      typeof data.air_date === 'string' &&
      typeof data.episode === 'string' &&
      Array.isArray(data.characters) &&
      typeof data.url === 'string' &&
      typeof data.created === 'string';
  };
  
  /**
   * Type guard for PaginationResponse
   * check if the response is a pagination response
   * @param data 
   * @param itemGuard 
   * @returns 
   */
  export const isPaginationResponse = <T>(data: any, itemGuard: (item: any) => item is T): data is PaginationResponse<T[]> => {
    return data &&
      data.info &&
      typeof data.info.count === 'number' &&
      typeof data.info.pages === 'number' &&
      (data.info.next === null || typeof data.info.next === 'string') &&
      (data.info.prev === null || typeof data.info.prev === 'string') &&
      Array.isArray(data.results) &&
      data.results.every(itemGuard);
  };
  

  
  /**
   * Type guard for URL safety
   * @param url 
   * @returns 
   */
export const isValidUrl = (url: any): url is string => {
  try {
    new URL(url); // Try creating a URL object
    return typeof url === 'string' && url.trim().length > 0;
  } catch {
    return false;
  }
};