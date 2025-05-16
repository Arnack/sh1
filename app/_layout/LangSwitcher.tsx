'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@chakra-ui/react'

export default function LangSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(nextLang)
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      px={2}
      minW="60px"
      h="32px"
      borderRadius="md"
      _hover={{ bg: 'whiteAlpha.200' }}
      onClick={toggleLanguage}
    >
      {i18n.language === 'en' ? 'РУС' : 'EN'}
    </Button>
  )
}