import 'vuetify/styles'
import { I18n, useI18n } from 'vue-i18n'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { md3 } from 'vuetify/blueprints/md3'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

const customTheme: ThemeDefinition = {
  colors: {
    primary: '#695CCD',
  },
}

export default function vuetify(i18n?: I18n) {
  return createVuetify({
    blueprint: md3,
    icons: {
      aliases,
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
    locale: i18n ? {
      adapter: createVueI18nAdapter({ i18n, useI18n })
    } : undefined,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  }) 
}