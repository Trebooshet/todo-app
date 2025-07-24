import ToDoItem from '../ToDoItem/ToDoItem';
import { Box, VStack, Image, Badge, Button } from '@chakra-ui/react';
import type { ToDoProps } from '../../utils/Types.ts';
import { useState } from 'react';
import { TbArrowsDownUp } from 'react-icons/tb';
import photoOfMe from '../../assets/Photoroom_20250723_235615.png';

function ToDoList({
  sortOrder,
  toggleSortOrder,
  toDoItems,
  deleteToDoItem,
  editToDoItem,
  doneToggle,
}: ToDoProps) {
  const [editedId, setEditedId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string | null>(null);
  const sortedToDoItems = [...toDoItems].sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return sortOrder === 'newestFirst' ? timeA - timeB : timeB - timeA;
  });

  function handleEdit(id: string, text: string) {
    setEditedId(id);
    setEditedText(text);
  }

  function handleSaveEdited() {
    if (editedText && editedText.trim() && editedId) {
      editToDoItem(editedId, editedText);
      setEditedId(null);
      setEditedText('');
    }
  }

  if (toDoItems.length === 0) {
    return (
      <VStack>
        <Image
          boxSize="250px"
          // rounded="full"
          objectFit="cover"
          src={photoOfMe}
          mt="4"
          ml="4"
          mb="-2"
        ></Image>
        <Badge
          variant="subtle"
          colorScheme="green"
          fontSize="lg"
          borderRadius="lg"
          p={2}
        >
          You have no any ToDos. Take a rest
        </Badge>
      </VStack>
    );
  }

  return (
    <>
      <Box>
        <VStack
          position="relative"
          w="60%"
          mx="auto"
        >
          {toDoItems.length > 1 && (
            <Button
              h="58px"
              position="absolute"
              top="0"
              right="-24"
              borderRadius="30px"
              onClick={toggleSortOrder}
            >
              Sort
              <Box
                as={TbArrowsDownUp}
                ml={2}
              />
            </Button>
          )}
          {sortedToDoItems.map((toDoItem) => (
            <ToDoItem
              key={toDoItem.id}
              item={toDoItem}
              editedId={editedId}
              editedText={editedText}
              setEditedText={setEditedText}
              handleSaveEdited={handleSaveEdited}
              handleEdit={handleEdit}
              deleteToDoItem={deleteToDoItem}
              doneToggle={doneToggle}
            />
          ))}
        </VStack>
      </Box>
    </>
  );
}

export default ToDoList;
