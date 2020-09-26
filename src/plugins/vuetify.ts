import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

import { Iconfont } from "vuetify/types/services/icons";

Vue.use(Vuetify);

const iconfont: Iconfont = "mdi";

/**
 * Opções padrão do vuetify
 * @see https://next.vuetifyjs.com/en/customization/theme/#api
 */
const options = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },
  icons: {
    iconfont,
    values: {}
  },
  lang: {
    current: "en",
    // locales: { en },
    t: undefined
  },
  rtl: false,
  theme: {
    dark: false,
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      dark: {
        primary: "#2196F3",
        secondary: "#424242",
        accent: "#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      }
    }
  }
};

export default new Vuetify(options);