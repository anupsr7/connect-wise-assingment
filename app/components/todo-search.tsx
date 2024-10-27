"use client"
import { dummyJsondb } from "@/dummy-jsondb/api";
import { useEffect, useState } from "react";
import { useSelectedUser } from "../hooks/selectedUser";

export default function SelectUser() {

    const usersInitialState = { users: [], total: 0, limt: 5, skip: 0 };

    const [users, setUsers] = useState(usersInitialState);
    
    const [searchVal, setSearchValue] = useState('');

    const [userId, setUserId] = useState(0);

    const fetchuser = async (limit: number, skip: number, searchParam: string) => {
        setUsers(await dummyJsondb.usersTaskList.users(limit, skip, searchParam));
    }

    const searchHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const searchText = (e.target.value).toString().trim();
        setSearchValue(searchText);
    }

    const resetHandler = () => {
        setUsers(usersInitialState);
        setSearchValue('');
        setSelectedUserId(0);
    }
    const { setSelectedUserId } = useSelectedUser();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('selectHandler', event.target.value)
        setUserId(Number(event.target.value));
    }

    const submitHandler = () => {
        console.log('submitHandler',userId)
        if(userId > 0) {
            setSelectedUserId(userId);
        }
    };

    useEffect(() => {
        if(searchVal?.length >= 3) {
            setUsers(usersInitialState);
            fetchuser(5, 0, searchVal);
        }
    }, [searchVal]);

    return (
        <>
            <div className="row col-md-12 mt-30">
               <div className="row col-md-1"></div>
                <div className="row col-md-3">
                    <div className="row col-md-8"><input type="text"  placeholder="min 3 char to search..." value={searchVal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e)}/></div>
                    <div className="row col-md-4">  <button className="btn-reset" onClick={() => resetHandler()} disabled={users.total === 0 && searchVal.length === 0} >Reset</button></div>
                </div>
                <div className="row col-md-2 ml-10">
                    <select className="selectpicker" onChange={handleSelectChange} disabled={users.total === 0 } name="users" id="users">
                        {users.total === 0 ? (
                            <option value="">No user</option>
                        ) : (
                            users.users.map(({ id, firstName, lastName }) => (
                                <option key={id} value={id}>
                                    {firstName} {lastName}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <div className="row col-md-2 ml-10">
                    <button className="btn" onClick={() => submitHandler()} disabled={users.total === 0 } >submit</button>
                </div>
                <div className="row col-md-2"></div>
            </div>
        </>
    )
} 