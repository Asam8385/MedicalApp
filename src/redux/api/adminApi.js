import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const AD_URL = '/admin'

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAdmin: build.query({
            query: (arg) => ({
                url: `${AD_URL}/${arg}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.admin]
        }),
    })
})

export const { useGetAdminQuery } = adminApi