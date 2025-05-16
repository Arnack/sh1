'use client'

import React from 'react'
import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const color = useColorModeValue('gray.700', 'gray.200')
  const { t } = useTranslation()


  return (
    <Box
      bg={bgColor}
      color={color}
      className="main-footer"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Stack direction={'row'} spacing={6}>
          <Box as={Link} href={'/'}>
            {t('footer.nav.home')}
          </Box>
        </Stack>
        <Text>
          ProjectMate {t('footer.rights', 'All rights reserved')}
        </Text>
      </Container>
    </Box>
  )
}