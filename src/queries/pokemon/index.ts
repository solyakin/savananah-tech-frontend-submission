import axios from "axios";
import { BASE_URL } from "config/baseurl";
import { UseQueryResult, useQuery } from "react-query";
import { DataPayload } from "./types";

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
      () => fetchingPokeMan(keyword, page, limit),
      {
        keepPreviousData: true,
      },
    );
  };