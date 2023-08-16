import { listApi } from "../lib/api";
import { ILoginResponse, ILogin } from "./dto/auth";
import { IResponseBase } from "./dto/base";

const baseUrl: string = "auth";

export const authEndpoint = listApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<IResponseBase<ILoginResponse>, ILogin>({
            query: (body) => ({
                url: `${baseUrl}/login`,
                method: "POST",
                body,
            })
        }),
        register: build.mutation({
            query: (body) => ({
                url: `${baseUrl}/register`,
                method: "POST",
                body
            })
        }),
        forgotPassword: build.mutation({
            query: (body) => ({
                url: `${baseUrl}/forgotpassword`,
                method: 'POST',
                body
            })
        }),
        changePassword: build.mutation({
            query: (body) => ({
                url: `${baseUrl}/changepassword`,
                method: 'PATCH',
                body
            })
        }),
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
} = authEndpoint;