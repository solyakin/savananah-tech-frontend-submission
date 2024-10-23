import * as i from 'types';
import { useMutation, useQueryClient, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { BASE_URL } from 'config/baseurl';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: i.DataPayload) => await new Promise<i.Data>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
          ...data,
        });
      }, 1000);
    }),
    {
      onSuccess: (data: i.Data) => {
        queryClient.invalidateQueries(['user', data.id]);
        queryClient.setQueryData(['user', data.id], data);
      },
    },
  );
};

export const useGetUser = (userId: string): UseQueryResult<i.Data | undefined> => {
  return useQuery(
    ['entry', userId],
    async () => await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
          name: 'John Doe',
        });
      }, 1000);
    }),
    {
      enabled: Boolean(userId),
    },
  );
};

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
  UseQueryResult< i.DataProps| undefined> => {
  return useQuery(
    ['pokemons', keyword, page, limit],
    () => fetchingPokeMan(keyword, page, limit),
    {
      keepPreviousData: true,
    },
  );
};