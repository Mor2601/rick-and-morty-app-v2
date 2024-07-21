import {Character,ApiEndpoints,Location, Episode, PaginationResponse,MultipleDataResponse}  from '../types';
const BASE_URL = 'https://rickandmortyapi.com/api';
/**
 * return the API endpoints from the base URL
 * @returns ApiEndpoints
 */
export const fetchApiEndpoints = async (): Promise<ApiEndpoints> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching API endpoints:', error);
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
export const fetchData = async (request: string): Promise<PaginationResponse<Location[] | Character[] | Episode[]>> => {
    try {
        
        const response = await fetch(`${request}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from ${request}:`, error);
        throw error;
    }
    };

export const fetchMultipleData = async (request:string):Promise<Location[] | Character[] | Episode[]> => {
    try {
        
        const response = await fetch(`${request}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from ${request}:`, error);
        throw error;
    }
    };


