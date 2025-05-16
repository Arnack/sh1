import React from 'react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, Button, ColorMode, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import { FC } from "react";
import LS from "../service/LS";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from 'next-i18next';
import LangSwitcher from "./LangSwitcher";

interface Props {
  user: {
    email?: string;
    password?: string;
    access_token?: string;
    refresh_token?: string;
  } | null;
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

export const RightLoginBar: FC<Props> = ({ user, colorMode, toggleColorMode }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      LS.removeUserInfo();
      router.push("/");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex alignItems={"center"} borderRadius="4px" backdropFilter="blur(6px)" padding={2}>
      <LangSwitcher />
      <Button variant="ghost" marginRight={4} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      {
        user ?
          (<Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                name={user?.email || undefined}
                src={user?.email || ''}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleSignOut}>
                {t('layout.navbar.navLinks.logout')}
              </MenuItem>
            </MenuList>
          </Menu>) :
          (<Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button as={Link} colorScheme="black" variant={'link'} href={'/login'}>
              {t('layout.navbar.navLinks.sign_in')}
            </Button>
          </Stack>)
      }
    </Flex>
  );
};
