import axios from "axios";
import { BASE_URL } from "config/baseurl";
import { UseQueryResult, useQuery } from "react-query";
import { DataPayload, PokemonData } from "./types";

const fetchingPokeMan = async(keyword: string, page: number, limit: number) => {

    const url = keyword ? 
                `${BASE_URL}/pokemon/?offset=${page}&limit=${limit}&name=${keyword}`
                : `${BASE_URL}/pokemon/?offset=${page}&limit=${limit}`
    const response = await axios.get(url);
    return response?.data;
  }
  
  export const useSearchQuery = (
    keyword: string, 
    page: number, 
    limit: number): 
    UseQueryResult<DataPayload| undefined> => {
    return useQuery(
      ['pokemons', keyword, page, limit],
      async() => {
        const data = await fetchingPokeMan(keyword, page, limit)
        // Simulate search by filtering results based on the keyword
        if (keyword) {
            const filteredResults = data?.results.filter((pokemon: PokemonData) =>
                pokemon.name.toLowerCase().includes(keyword.toLowerCase())
            );
            return { ...data, results: filteredResults };
        }
        return data;
      },
      {
        keepPreviousData: true,
      },
    );
  };