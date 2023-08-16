import { listApi } from "../lib/api";

const baseUrl: string = "user";

export const userEndpoint = listApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (body) => ({
                url: `${baseUrl}/changepassword`,
                method: 'PATCH',
                body
            })
        }),
        getprofile: build.query<any, void>({
            query: () => `${baseUrl}/profile`
        })
    }),
});

export const {
    useGetprofileQuery,
    useChangePasswordMutation
} = userEndpoint;