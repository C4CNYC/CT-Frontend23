import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAccessControl, IAccessControlsResponse } from '../interfaces/access-control.interface';



export const accessControlApi = createApi({
    reducerPath: 'api/accessControl',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/access-control` }),
    tagTypes: ['self'],
    endpoints: (builder) => ({
        getAllFeatures: builder.query<IAccessControlsResponse,void>({
            query: () => '/all',
        }),
        getSelfAccess: builder.query<IAccessControlsResponse,void>({
            query: () => ({
                url: '/self',
                method: 'GET',
            }),
        }),
        getByUserId: builder.query<IAccessControlsResponse,{userId: string}>({
            query: ({ userId }) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
        }),
        decreaseToUserId: builder.mutation<number,{feature: string}>({
            query: ({ feature }) => ({
                url: `/${feature}`,
                method: 'DELETE',
            }),
        }),
        addFeature: builder.mutation<IAccessControlsResponse,{userId: string; dto: IAccessControl}>({
            query: ({ userId, dto }) => ({
                url: `/${userId}`,
                method: 'POST',
                body: dto,
            }),
        }),
    }),
});

export const {
    useGetAllFeaturesQuery,
    useGetSelfAccessQuery,
    useGetByUserIdQuery,
    useDecreaseToUserIdMutation,
    useAddFeatureMutation,
} = accessControlApi;