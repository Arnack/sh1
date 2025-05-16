"use client";

import React from 'react'
import {
  Box,
  Flex,
  HStack,
  useColorMode,
  Text,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { RightLoginBar } from "./rightLoginBar";
import { useAuth } from "../context/authContext";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';


const NavLink = (props: any) => {
  const { children, href } = props;
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"/" + href}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const { user } = useAuth();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <div style={{ position: 'fixed', top: 0, zIndex: 100, width: '100vw', height: '0', marginBottom: '40px' }} />
      <Box
        position="fixed"
        bg={bgColor}
        top={0}
        zIndex={100}
        width="100vw"
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {user && <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />}
          <HStack spacing={8} alignItems={"center"}>
            <Box mr={8}>
              <Link href="/">
                <Text fontSize="xl" borderRadius="6px" padding={2} fontWeight="bold">ProjectMate</Text>
              </Link>
            </Box>

            {user && <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >

              <NavLink href="">
                {t('Home')}
              </NavLink>

            </HStack>}

          </HStack>
          <RightLoginBar
            user={user}
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} style={{
            backdropFilter: "blur(6px)",
          }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink href="">
                {t('Home')}
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
