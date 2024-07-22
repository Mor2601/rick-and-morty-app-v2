import {
  Character,
  ApiEndpoints,
  Location,
  Episode,
  PaginationResponse,
  MultipleDataResponse,
} from "../types";
const BASE_URL = "https://rickandmortyapi.com/api";
/**
 * return the API endpoints from the base URL
 * @returns ApiEndpoints
 */
export const fetchApiEndpoints = async (): Promise<ApiEndpoints> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching API endpoints:", error);
    throw error;
  }
};
/**
 * generic function to fetch data from the API it will return a PaginationResponse that contains
 * the info for pagination and the results. the results can be Location or Character or Episode ojects for each of them
 * @param request -location character or episode url
 * @param query -for filter and pagination options
 * @returns location or character or episode objects
 */
export const fetchData = async (
  request: string
): Promise<PaginationResponse<Location[] | Character[] | Episode[]>> => {
  try {
    const response = await fetch(`${request}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching data from ${request}:`, error);
    throw error;
  }
};
/**
 * generic function to fetch data from the API it will return a Charaters or Locations or Episodes
 * for get queries that fetch mutiple object from the data based on the query
 * @param request -location character or episode url
 * @param query -for filter and pagination options
 * @returns location or character or episode objects
 */
export const fetchMultipleData = async (
  request: string
): Promise<Location[] | Character[] | Episode[]> => {
  try {
    const response = await fetch(`${request}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching data from ${request}:`, error);
    throw error;
  }
};

/**
 * fetch all chcaraters or locations or episodes from the API
 * @param request -location character or episode url
 * @returns location or character or episode objects
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
        console.error(`Error fetching data from `, error);
        throw error;
    }
};
//TODO:check for type gurad


  