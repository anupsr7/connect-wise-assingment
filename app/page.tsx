import ToDoList from "./components/todo-list";
import SelectUser from "./components/todo-search";
import { SelectedUserProvider } from "./hooks/selectedUser";

export default function Home() {
  return (
    <>
      <SelectedUserProvider>
        <SelectUser />
        <ToDoList />
      </SelectedUserProvider>
    </>
  );
}
