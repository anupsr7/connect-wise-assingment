"use client"

import { Suspense, useEffect, useState } from "react";
import {ToDoTable} from "./ui/todo-table";
import { TodosResp } from "@/constant/constant";
import { dummyJsondb } from "@/dummy-jsondb/api";
import { useSelectedUser } from "../hooks/selectedUser";

export default function ToDoList() {
    const limit = 5;
    const todosInitialValue: TodosResp = {todos:[], total: 0, limit: 5, skip: 0};

    const [skip, setSkip] = useState(0);
    const [todos, setTodos] = useState(todosInitialValue);
    const { userId } = useSelectedUser();
    const fetchTodos = async (limit: number, skip: number) => {
        setTodos(await dummyJsondb.todoTaskList.todolist(limit, skip));
    }

    const getUserTodo = async (userid: number,  limit: number, skip: number) => {
        setTodos(await dummyJsondb.todoTaskList.userTodolist(userid, limit, skip));
    }

    const paginationNext = () => {
        setSkip(skip + limit);
    }

    const paginationPrev = () => {
        setSkip(skip - limit);
    }

    useEffect(() => {
        fetchTodos(limit, skip);
    }, [skip]);

    useEffect(() => {
        console.log(userId)
        if(userId) {
            getUserTodo(userId, limit, skip);
        }else {
            fetchTodos(limit, skip);
        }
    }, [userId])

    return (
         <Suspense fallback= {'Loading...'}>
            <ToDoTable  
            todosList={todos} 
            paginationNext = {paginationNext}
            paginationPrev = {paginationPrev}
            limit = {limit}
            skip = {skip}
            />
         </Suspense>
    );
}