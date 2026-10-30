import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    createdAt: string;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database: string;
}

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Contact", "Health"],
  endpoints: (builder) => ({
    sendContact: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
    getHealth: builder.query<HealthResponse, void>({
      query: () => "/health",
      providesTags: ["Health"],
    }),
  }),
});

export const { useSendContactMutation, useGetHealthQuery } = contactApi;

