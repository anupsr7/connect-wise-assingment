
import { api } from "../api"

const users = (limit: number, skip: number, searchParam: string) => api.fetcher(`users/search`, { limit, skip, searchParam });

const userbyId = (userid: number) => api.fetcher('user', { userid});

export const usersTaskList = {
    users,
    userbyId
}