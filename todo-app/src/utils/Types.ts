export type ToDoItemType = {
  id: string;
  body: string;
  done: boolean;
  time: Date;
};

export type ToDoItemProps = {
  item: {
    id: string;
    body: string;
    done: boolean;
    time: Date;
  };
  editedId: string | null;
  editedText: string | null;
  setEditedText: (text: string) => void;
  handleSaveEdited: () => void;
  handleEdit: (id: string, text: string) => void;
  deleteToDoItem: (id: string) => void;
  doneToggle: (id: string) => void;
};

export type ToDoProps = {
  sortOrder: 'newestFirst' | 'oldestFirst';
  toggleSortOrder: () => void;
  toDoItems: ToDoItemType[];
  deleteToDoItem: (id: string) => void;
  editToDoItem: (editedId: string, editedText: string) => void;
  doneToggle: (id: string) => void;
  setToDoItems: React.Dispatch<React.SetStateAction<ToDoItemType[]>>;
};

export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void };
