import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseListResponseInterface, BaseResponseInterface} from "src/utils/baseResponce.interface";
import {baseQueryWrapper} from "./helpers/base_query_wrapper";
import {baseQueryWithAuth} from "./helpers/query_with_auth";
import { SchoolProfile, SchoolContacts, SchoolResponce, SchoolSettings } from "./interfaces/school.interface";

export const managerApi = createApi({
	reducerPath: "api/manager",
	baseQuery: baseQueryWithAuth(
		baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
	),
	tagTypes: ["School", "SchoolSettings", "SchoolContacts"],
	endpoints: (builder) => ({
		getMySchools: builder.query<
			BaseListResponseInterface<SchoolResponce>,
			void
		>({
			query: () => ({
				url: `/school`,
				method: "GET",
			}),
			providesTags: ["School"],
		}),
		updateSchoolProfile: builder.mutation<
			SchoolProfile & BaseResponseInterface,
			SchoolProfile
		>({
			query: ({school_id, ...body}) => ({
				url: `school/${school_id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: [{type: "School"}],
		}),
		getSchoolProfile: builder.query<
			SchoolProfile & BaseResponseInterface,
			{ school_id: string }
		>({
			query: ({ school_id }) => ({
				url: `/school/${school_id}`,
				method: "GET",
			}),
			providesTags: ["School"],
		}),
		updateSchoolSettings: builder.mutation<
			SchoolSettings & BaseResponseInterface,
			SchoolSettings
		>({
			query: ({school_id, ...body }) => ({
				url: `/school/${school_id}/setting/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: [{ type: "SchoolSettings" }],
		}),
		getSchoolSettings: builder.query<
			SchoolSettings & BaseResponseInterface,
			{ school_id: string }
		>({
			query: ({ school_id }) => ({
				url: `/school/${school_id}/setting/`,
				method: "GET",
			}),
			providesTags: ["SchoolSettings"],
		}),
		updateSchoolContacts: builder.mutation<
			SchoolContacts & BaseResponseInterface,
			SchoolContacts
		>({
			query: ({school_id, ...body }) => ({
				url: `/school/${school_id}/contact/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: [{ type: "SchoolContacts" }],
		}),
		getSchoolContacts: builder.query<
			SchoolContacts & BaseResponseInterface,
			{ school_id: string }
		>({
			query: ({ school_id }) => ({
				url: `/school/${school_id}/contact/`,
				method: "GET",
			}),
			providesTags: ["SchoolContacts"],
		}),
	}),
});

export const {
	useGetMySchoolsQuery,
	useGetSchoolProfileQuery,
	useGetSchoolSettingsQuery,
	useGetSchoolContactsQuery,
	//---------------- mutations --------------
	useUpdateSchoolProfileMutation,
	useUpdateSchoolSettingsMutation,
	useUpdateSchoolContactsMutation,
} = managerApi;
