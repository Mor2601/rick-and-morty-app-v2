import {
  Character,
  ApiEndpoints,
  Location,
  Episode,
  PaginationResponse,

} from "../types";
import {
  isCharacter,
  isLocation,
  isEpisode,
  isPaginationResponse,
 
} from "../types/typeGuards";

const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Fetch the API endpoints from the base URL.
 * @returns ApiEndpoints - The available API endpoints for characters, locations, and episodes.
 */
export const fetchApiEndpoints = async (): Promise<ApiEndpoints> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Optional: You can add a type guard check here if needed
    return data;
  } catch (error) {
    console.error("Error fetching API endpoints:", error);
    throw error;
  }
};

/**
 * Fetch data from the API.
 * This function returns a PaginationResponse that contains information for pagination
 * and results which can be Location, Character, or Episode objects.
 * @param request - The URL for the location, character, or episode endpoint.
 * @returns PaginationResponse<Location[] | Character[] | Episode[]> - Contains pagination info and results.
 */
export const fetchData = async (
  request: string
): Promise<PaginationResponse<Location[] | Character[] | Episode[]>> => {
  try {
    const response = await fetch(request);
    // If the status is 404, return empty results and info
    if (response.status === 404) {
      return {
        results: [],
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
      };
    }

    if (!response.ok) {
      throw new Error(
        `Network response was not ok - Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Type guard check
    if (
      isPaginationResponse(data, isCharacter) ||
      isPaginationResponse(data, isLocation) ||
      isPaginationResponse(data, isEpisode)
    ) {
      return data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error(`Error fetching data from ${request}:`, error);
    throw error;
  }
};

/**
 * Fetch multiple data items from the API.
 * This function returns an array of Location, Character, or Episode objects.
 * @param request - The URL for the location, character, or episode endpoint.
 * @returns Location[] | Character[] | Episode[] - Array of location, character, or episode objects.
 */
export const fetchMultipleData = async (
  request: string
): Promise<Location[] | Character[] | Episode[]> => {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Type guard check
    if (
      Array.isArray(data) &&
      (data.every(isLocation) ||
        (data as Character[]).every(isCharacter) ||
        (data as Episode[]).every(isEpisode))
    ) {
      return data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error(`Error fetching data from ${request}:`, error);
    throw error;
  }
};

/**
 * Fetch all characters, locations, or episodes from the API.
 * This function handles pagination and collects all items.
 * @param url - The URL for the location, character, or episode endpoint.
 * @returns T[] - Array of location, character, or episode objects.
 */
export const fetchAllData = async <T>(url?: string): Promise<T[]> => {
  try {
    const result = await fetch(url ?? "");
    console.log("result", result);
    if (!result.ok) {
      throw new Error("Network response was not ok");
    }
    let response = await result.json();
    let data: T[] = [];
    while (response.info.next) {
      data.push(...response.results);
      const result = await fetch(response.info.next);
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      response = await result.json();
    }
    data.push(...response.results);
    return data;
  } catch (error) {
    console.error("Error fetching data from", error);
    throw error;
  }
};
