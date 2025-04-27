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
        // getRoleByName: builder.query<Role, Role>({
        //     query: (id) => `recipes/${id}`,
        //     providesTags: (result, error, id) => [{ type: "Recipe", id }],
        // }),
        getRoleByName: builder.query<{ _id: string }, string>({
            query: (roleName) => `roles/${roleName}`,
        }),
    })
})

export const { useAddUserMutation, useAddOrganizationMutation ,useGetRoleByNameQuery} = authApi;