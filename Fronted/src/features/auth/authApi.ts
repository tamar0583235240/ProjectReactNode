import { api } from "../../app/api";
import { User } from "../../types/User";
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation<User, User>({
            query: (user) => ({
                url: "user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
    })
})

export const { useAddUserMutation } = authApi;