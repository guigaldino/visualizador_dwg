import { AcApI18n } from '@mlightcad/cad-simple-viewer'
import { AcDbEntity } from '@mlightcad/data-model'
import { createI18n } from 'vue-i18n'

import enCommand from './en/command'
import enDialog from './en/dialog'
import enEntity from './en/entity'
import enMain from './en/main'
import ptCommand from './pt/command'
import ptDialog from './pt/dialog'
import ptEntity from './pt/entity'
import ptMain from './pt/main'
import zhCommand from './zh/command'
import zhDialog from './zh/dialog'
import zhEnity from './zh/entity'
import zhMain from './zh/main'

// Get language of browser - use same logic as useLocale
const getInitialLocale = (): string => {
  const stored = localStorage.getItem('preferred_lang')
  if (stored === 'en' || stored === 'zh' || stored === 'pt') return stored

  const browserLang = navigator.language.toLowerCase()
  const browserLocale = browserLang.substring(0, 2)
  if (browserLocale === 'zh') return 'zh'
  if (browserLocale === 'pt') return 'pt'
  return 'en'
}

const messages = {
  en: {
    main: enMain,
    command: enCommand,
    dialog: enDialog,
    entity: enEntity
  },
  zh: {
    main: zhMain,
    command: zhCommand,
    dialog: zhDialog,
    entity: zhEnity
  },
  pt: {
    main: ptMain,
    command: ptCommand,
    dialog: ptDialog,
    entity: ptEntity
  }
}

AcApI18n.mergeLocaleMessage('en', messages.en)
AcApI18n.mergeLocaleMessage('zh', messages.zh)
AcApI18n.mergeLocaleMessage('pt', messages.pt)

export const i18n = createI18n({
  legacy: false,
  messages: AcApI18n.messages,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  allowComposition: true,
  globalInjection: true
})
export const entityName = (entity: AcDbEntity) => {
  const t = i18n.global.t
  const key = 'entity.entityName.' + entity.type
  return t(key, entity.type, { missingWarn: false })
}

export const entityPropName = (name: string) => {
  const t = i18n.global.t
  const key = 'entity.property.' + name
  return t(key, name, { missingWarn: false })
}

export const entityPropEnum = (name: string) => {
  const t = i18n.global.t
  const key = 'entity.enum.' + name
  return t(key, name, { missingWarn: true })
}

export const colorName = (colorKeyName: string) => {
  if (colorKeyName == 'ByLayer' || colorKeyName == 'ByBlock') {
    return colorKeyName
  } else {
    const t = i18n.global.t
    const key = 'entity.color.' + colorKeyName.toLowerCase()
    return t(key, colorKeyName, { missingWarn: false })
  }
}

export const toolPaletteTitle = (name: string) => {
  const t = i18n.global.t
  const key = `main.toolPalette.${name}.title`
  return t(key, name, { missingWarn: false })
}

export const toolPaletteTabName = (name: string) => {
  const t = i18n.global.t
  const key = `main.toolPalette.${name}.tab`
  return t(key, name, { missingWarn: false })
}

export default i18n
