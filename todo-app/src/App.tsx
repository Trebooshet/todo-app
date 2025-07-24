import Header from './components/Header.tsx';
import ToDoList from './components/ToDoList/ToDoList';
import AddToDo from './components/AddToDo/AddToDo';
import {
  getToDoItemsFromLocalStorage,
  saveToDoItemsToLocalStorage,
} from './utils/LocalStorage.ts';
import {
  addToDoItem,
  editToDoItem,
  deleteToDoItem,
  doneToggle,
} from './utils/ToDoFunctions.ts';
import { useState, useEffect } from 'react';
import type { ToDoItemType } from './utils/Types.ts';

export default function App() {
  const [toDoItems, setToDoItems] = useState(() =>
    getToDoItemsFromLocalStorage()
  );
  const [sortOrder, setSortOrder] = useState<'newestFirst' | 'oldestFirst'>(
    'oldestFirst'
  );

  function toggleSortOrder() {
    setSortOrder((prev) =>
      prev === 'newestFirst' ? 'oldestFirst' : 'newestFirst'
    );
  }

  useEffect(() => {
    saveToDoItemsToLocalStorage(toDoItems);
  }, [toDoItems]);

  function handleAdd(toDo: ToDoItemType) {
    addToDoItem(toDoItems, setToDoItems, toDo);
  }

  function handleEdit(id: string, newText: string) {
    editToDoItem(setToDoItems, id, newText);
  }

  function handleDelete(id: string) {
    deleteToDoItem(toDoItems, setToDoItems, id);
  }

  function handleToggle(id: string) {
    doneToggle(setToDoItems, id);
  }

  return (
    <>
      <Header />
      <AddToDo addToDoItem={handleAdd}></AddToDo>
      <ToDoList
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        toDoItems={toDoItems}
        deleteToDoItem={handleDelete}
        editToDoItem={handleEdit}
        doneToggle={handleToggle}
        setToDoItems={setToDoItems}
      ></ToDoList>
    </>
  );
}
