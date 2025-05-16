'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '@/public/locales/en/common.json'
import ruCommon from '@/public/locales/ru/common.json'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false, 
    resources: {
      en: {
        common: enCommon
      },
      ru: {
        common: ruCommon
      }
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    interpolation: {
      escapeValue: false
    }
  })

export default i18next