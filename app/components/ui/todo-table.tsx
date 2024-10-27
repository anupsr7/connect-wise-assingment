
import { TodosResp } from "@/constant/constant";
import Link from "next/link";
type todoProps = { todosList: TodosResp, paginationNext: () => void, paginationPrev: () => void, limit: number, skip: number };
const ToDoTable = ({ todosList, paginationNext, paginationPrev, limit, skip }: todoProps) => {

    return (
        <>
            <div className="mt-30">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Todo</th>
                            <th>Completed</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todosList.total === 0 ? (
                            <tr>
                                <td colSpan={4}>No Data Available.</td>
                            </tr>
                        ) : (
                            todosList.todos.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.todo}</td>
                                    <td>{user.completed ? "Yes" : "No"}</td>
                                    <td>
                                        <Link href={`/user/${user.userId}`} prefetch={false}>{user.userId}</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {todosList.total === 0 ? null : (
                    <div className="row">
                        <div className="row col-md-4"></div>
                        <div className="row col-md-1">
                            <button className="btn" disabled={skip === 0} onClick={() => paginationPrev()}>
                                Previous
                            </button>
                        </div>
                        <div className="row col-md-2">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-6 page-info">
                                <span> {Math.ceil((skip + limit)) / limit} of {Math.ceil(todosList.total / limit)}</span>
                            </div>
                            <div className="col-md-3">

                            </div>
                        </div>
                        <div className="row col-md-1">
                            <button className="btn" disabled={(skip + limit) >= todosList.total} onClick={() => paginationNext()}>Next</button>
                        </div>
                        <div className="row col-md-4"></div>
                    </div>
                )}

            </div>
        </>
    )
}

export { ToDoTable }