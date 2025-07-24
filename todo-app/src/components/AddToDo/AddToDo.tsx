import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import type { AddToDoProps } from '../../utils/Types.ts';

function AddToDo({ addToDoItem }: AddToDoProps) {
  const [input, setInput] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isError = input.trim().length === 0 && wasSubmitted;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWasSubmitted(false);
    const value = e.target.value;
    const capitalize = value.trim().charAt(0).toUpperCase() + value.slice(1);
    setInput(capitalize);
  }

  function handleAddButtonClick() {
    setWasSubmitted(true);
    const isError = input.trim().length === 0;
    if (isError) return;

    setWasSubmitted(false);
    const toDo = {
      id: nanoid(),
      body: input,
      done: false,
      time: new Date(),
    };
    addToDoItem(toDo);
    setInput('');
  }

  return (
    <VStack
      w="60%"
      mx="auto"
      py="4"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      mb="2"
    >
      <FormControl isInvalid={isError}>
        <FormLabel>New ToDo</FormLabel>
        <HStack>
          <Input
            type="text"
            value={input}
            placeholder="Wright here"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddButtonClick();
              }
            }}
            minH="50"
          />
          <Button onClick={handleAddButtonClick}>Add</Button>
        </HStack>
        {isError && (
          <FormErrorMessage>Wright something to create ToDo</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
}
export default AddToDo;
