import * as i from 'types';
import { useMutation, useQueryClient, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

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


let BASE_URL = 'https:example.com'

const fetchingPokeMan = async(keyword: string, page: number) => {
  const response = await axios.get(`${BASE_URL}/query?page=${page}&search=${keyword}`);
  return response?.data;
}

export const useSearchQuery = (keyword: string, page: number): UseQueryResult<i.Data | undefined> => {
  return useQuery(
    ['search', keyword, page],
    () => fetchingPokeMan(keyword, page),
    {
      keepPreviousData: true,
    },
  );
};