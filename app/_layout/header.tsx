'use client'

import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react';
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import Navigation from './navbar';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="60px"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      zIndex={1000}
    >
      <Flex h="100%" align="center" justify="space-between" px={4}>
        <Navigation />
        
        <Flex align="center" gap={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              variant="filled"
              bg="gray.50"
              _hover={{ bg: 'gray.100' }}
              _focus={{ bg: 'white' }}
            />
          </InputGroup>

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header; 