
export interface Todos {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

export interface TodosResp {
    todos: Array<Todos>,
    total: number,
    limit: number,
    skip: number
}
export interface DetailProps {
  userid: string;
}