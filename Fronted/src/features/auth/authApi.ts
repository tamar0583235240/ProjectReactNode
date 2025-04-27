import { api } from "../../app/api";
import { Organization } from "../../types/Organization";
import { User } from "../../types/User";
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation<User, User>({
            query: (user) => ({
                url: "users/AddUser",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),

        addOrganization: builder.mutation<Organization, Organization>({
            query: (organization) => ({
                url: "organizations/AddOrganization",
                method: "POST",
                body: organization,
            }),
            invalidatesTags: ["Organization"],
        }),
    })
})

export const { useAddUserMutation,useAddOrganizationMutation } = authApi;