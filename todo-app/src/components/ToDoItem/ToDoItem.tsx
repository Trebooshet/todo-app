import { HStack, Text, IconButton, Image, Input } from '@chakra-ui/react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import type { ToDoItemProps } from '../../utils/Types.ts';
import checkMark from '../../assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png';

export default function ToDoItem({
  item,
  editedId,
  editedText,
  setEditedText,
  handleSaveEdited,
  handleEdit,
  deleteToDoItem,
  doneToggle,
}: ToDoItemProps) {
  return (
    <HStack
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      w="full"
      justify={'space-between'}
      onClick={() => editedId !== item.id && doneToggle(item.id)}
      bgGradient={
        item.done ? 'linear(to-r, green.500, green.900)' : 'transparent'
      }
    >
      {item.id === editedId ? (
        <Input
          value={editedText ?? ''}
          w="70%"
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdited();
            }
          }}
          autoFocus
        />
      ) : (
        <Text
          whiteSpace="normal"
          textAlign="left"
        >
          {item.body}
        </Text>
      )}

      <HStack>
        {item.done && (
          <Image
            boxSize="36px"
            rounded="full"
            objectFit="cover"
            src={checkMark}
          />
        )}
        <IconButton
          aria-label="edit To Do"
          rounded="full"
          icon={<RiEdit2Line />}
          onClick={(e) => {
            if (!item.done) {
              e.stopPropagation();
            }
            handleEdit(item.id, item.body);
          }}
        />
        <IconButton
          aria-label="delete To Do"
          rounded="full"
          icon={<RiDeleteBin6Line />}
          onClick={() => deleteToDoItem(item.id)}
        />
      </HStack>
    </HStack>
  );
}
