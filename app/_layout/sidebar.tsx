'use client'

import { Box, VStack, Text, Icon, Link, Avatar, Flex } from '@chakra-ui/react';
import { FiHome, FiFolder, FiSettings, FiUsers } from 'react-icons/fi';
import NextLink from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/' },
    { icon: FiFolder, label: 'Projects', href: '/projects' },
    { icon: FiUsers, label: 'Team', href: '/team' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
  ];

  return (
    <Box
      as="aside"
      w="250px"
      h="100vh"
      bg="gray.50"
      borderRight="1px"
      borderColor="gray.200"
      position="fixed"
      left={0}
      top={0}
      pt="60px"
    >
      <VStack spacing={4} align="stretch" px={4}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            as={NextLink}
            href={item.href}
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              align="center"
              p={3}
              borderRadius="md"
              _hover={{ bg: 'gray.100' }}
              transition="all 0.2s"
            >
              <Icon as={item.icon} boxSize={5} mr={3} />
              <Text>{item.label}</Text>
            </Flex>
          </Link>
        ))}
      </VStack>

      <Box
        position="absolute"
        bottom={0}
        w="100%"
        p={4}
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex align="center">
          <Avatar size="sm" name="User Name" mr={3} />
          <Box>
            <Text fontWeight="bold" fontSize="sm">User Name</Text>
            <Text fontSize="xs" color="gray.500">user@example.com</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar; 