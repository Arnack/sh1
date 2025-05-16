"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useTranslation } from 'react-i18next';
import { AuthService } from "@/app/service/auth";
import { log } from "node:console";

export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const toast = useToast();
  const { t } = useTranslation();

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    };

    if (!email) {
      errors.email = t('loginPage.validation.email_required', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t('loginPage.validation.email_invalid', 'Invalid email address');
    }

    if (!pwd) {
      errors.password = t('loginPage.validation.password_required', 'Password is required');
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const signInWithEnP = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await AuthService.login({ email, password: pwd });
      
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.code === 'auth/invalid-credential'
        ? t('loginPage.toast.invalid_credentials', 'Invalid email or password')
        : t('loginPage.toast.error.description', 'Please check your credentials');

      toast({
        position: "top-right",
        title: t('loginPage.toast.error.title', 'Unable to login'),
        description: errorMessage,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      minH="calc(100vh - 56px)"
      bg={useColorModeValue("gray.50", "gray.800")}
      py={12}
      px={4}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w="full">
        <Stack align={"center"} spacing={4}>
          <Heading fontSize={"2xl"} textAlign="center">
            {t('loginPage.title', 'Sign in')}
          </Heading>
            
        </Stack>
        <Box
          rounded={"xl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xl"}
          p={8}
          w="full"
        >
          <VStack spacing={6}>
            <FormControl isInvalid={!!formErrors.email}>
              <FormLabel>{t('loginPage.form.email', 'Email address')}</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                size="lg"
              />
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.password}>
              <FormLabel>{t('loginPage.form.password', 'Password')}</FormLabel>
              <InputGroup>
                <Input
                  value={pwd}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPWD(e.target.value)}
                  size="lg"
                />
                <InputRightElement h="full">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="link"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            </FormControl>

            <Button
              w="full"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={signInWithEnP}
              isLoading={isLoading}
              loadingText={t('loginPage.buttons.signing_in', 'Signing in...')}
            >
              {t('loginPage.buttons.sign_in', 'Sign in')}
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
}