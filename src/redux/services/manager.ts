import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseListResponseInterface, BaseResponseInterface} from "src/utils/baseResponce.interface";
import {baseQueryWrapper} from "./helpers/base_query_wrapper";
import {baseQueryWithAuth} from "./helpers/query_with_auth";
import {SchoolProfile, SchoolProfileResponce, SchoolResponce} from "./interfaces/school.interface";
import {OrganizationResponce} from "./interfaces/organization.interface";
import {IUser} from "./interfaces/user.interface";

export const managerApi = createApi({
	reducerPath: "api/manager",
	baseQuery: baseQueryWithAuth(
		baseQueryWrapper(`${process.env.NEXT_PUBLIC_API_URL}/manager`)
	),
	tagTypes: ["School"],
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
	}),
});

export const {
	useGetMySchoolsQuery,
	useGetSchoolProfileQuery,
	//---------------- mutations --------------
	useUpdateSchoolProfileMutation
} = managerApi;
