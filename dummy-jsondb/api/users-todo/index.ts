
import { api } from "../api"

const todolist = (limit: number, skip: number) => api.fetcher('todos', { limit, skip });

const userTodolist = (userid: number, limit: number, skip: number) => api.fetcher('todos/user', { userid, limit, skip });

export const todoTaskList = {
  todolist,
  userTodolist
}
