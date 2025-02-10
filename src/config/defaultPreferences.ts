import type { Preferences } from "@/stores/storeState";

/**
 * 默认偏好设置
 */
export const defaultPreferences: Preferences = {
  app: {
    checkUpdatesInterval: 1,
    colorGrayMode: false,
    colorWeakMode: false,
    compact: false,
    contentCompact: "wide",
    defaultAvatar: "",
    dynamicTitle: true,
    enableCheckUpdates: true,
    enablePreferences: true,
    enableRefreshToken: false,
    isMobile: false,
    layout: "sidebar-nav",
    locale: "zh-CN",
    loginExpiredMode: "page",
    name: "Fusion",
    preferencesButtonPosition: "auto",
    watermark: false,
  },
  breadcrumb: {
    enable: true,
    hideOnlyOne: false,
    showHome: false,
    showIcon: true,
    styleType: "normal",
  },
  copyright: {
    companyName: "fusion",
    companySiteLink: "http://fusionadmin.cn",
    date: "2024",
    enable: true,
    icp: "",
    icpLink: "",
    settingShow: true,
  },
  footer: {
    enable: false,
    fixed: false,
  },
  header: {
    enable: true,
    hidden: false,
    menuAlign: "start",
    mode: "fixed",
  },
  logo: {
    enable: true,
    source: "",
  },
  navigation: {
    accordion: true,
    split: true,
    styleType: "rounded",
  },
  shortcut: {
    enable: true,
    globalLockScreen: true,
    globalLogout: true,
    globalPreferences: true,
    globalSearch: true,
  },
  sidebar: {
    autoActivateChild: false,
    collapsed: false,
    collapsedShowTitle: false,
    enable: true,
    expandOnHover: true,
    extraCollapse: false,
    hidden: false,
    width: 224,
  },
  tabbar: {
    draggable: true,
    enable: true,
    height: 38,
    keepAlive: true,
    persist: true,
    showIcon: true,
    showMaximize: true,
    showMore: true,
    styleType: "chrome",
    wheelable: true,
  },
  theme: {
    builtinType: "default",
    colorError: "#ff4d4f",
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    mode: "light",
    radius: "0.5",
    semiDarkHeader: false,
    semiDarkSidebar: false,
  },
  animation: {
    enable: true,
    loading: true,
    name: "fade-slide",
    progress: true,
  },
  widget: {
    fullscreen: true,
    globalSearch: true,
    languageToggle: true,
    lockScreen: true,
    lockScreenStatus: false,
    notification: true,
    refresh: true,
    sidebarToggle: true,
    themeToggle: true,
  },
};
