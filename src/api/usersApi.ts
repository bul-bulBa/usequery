import { api } from "./api";

export type User = {
    id: string,
    username: string,
    age: number
}

export type URes = {
    data: User[],
    total: number
}

export type Createuser = {
    username: string,
    age: number
}

export type CreateObj = {
    data: Createuser
    page: number
}

export const usersApi = {
    getUsers: ({ page, limit }: { page: number; limit: number }) =>
        api.get<User[]>("/users", { params: { _page: page, _limit: limit } })
            .then((res) => {
                const data = res.data;
                const total: number = res.headers["x-total-count"] ?? 0;

                return { data, total };
            }),

    createUser: (user: Createuser) => api.post<User>('/users', user)
        .then(res => res.data),


    updateUser: (user: User) => api.put<User>('/users', user)
        .then(res => res.data),

    deleteUser: (id: string) => api.delete<User>(`/users/${id}`)
        .then(res => res.data)
}