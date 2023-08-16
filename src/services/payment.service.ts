import { listApi } from "../lib/api";
import { IAddBank, IVerifyBank } from "./dto/payment";

const baseUrl: string = "payment";

export const paymentEndpoint = listApi.injectEndpoints({
    endpoints: (build) => ({
        verifyBankDetails: build.mutation<any, IVerifyBank>({
            query: (body) => ({
                url: `${baseUrl}/verify-bank`,
                method: 'POST',
                body
            })
        }),
        addBankDetails: build.mutation<any, IAddBank>({
            query: (body) => ({
                url: `${baseUrl}/add-bank`,
                method: 'POST',
                body
            })
        }),
    }),
});

export const {
    useVerifyBankDetailsMutation,
    useAddBankDetailsMutation
} = paymentEndpoint;