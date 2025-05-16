'use client';

import { useState, useRef } from 'react';
import {
  Input,
  Box,
  List,
  ListItem,
  useOutsideClick,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

export const InputWithHistory = () => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const selectedBgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const filteredSuggestions = history
    .filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 5);

  useOutsideClick({
    ref: containerRef,
    handler: () => setShowSuggestions(false),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex > -1) {
          const selectedValue = filteredSuggestions[selectedIndex];
          setInputValue(selectedValue);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        } else if (inputValue.trim()) {
          handleSubmit(inputValue);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    
    setHistory((prev) => {
      const newHistory = [value, ...prev.filter((item) => item !== value)];
      return newHistory.slice(0, 10); // Keep last 10 items
    });

    setInputValue('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  return (
    <Box ref={containerRef} position="relative" width="100%">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something..."
        autoComplete="off"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <List
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={1}
          bg={bgColor}
          boxShadow="md"
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack spacing={0} align="stretch">
            {filteredSuggestions.map((suggestion, index) => (
              <ListItem
                key={suggestion}
                px={4}
                py={2}
                cursor="pointer"
                bg={selectedIndex === index ? selectedBgColor : 'transparent'}
                _hover={{ bg: hoverBgColor }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </ListItem>
            ))}
          </VStack>
        </List>
      )}
    </Box>
  );
};
