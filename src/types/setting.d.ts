export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN';
}

export type ThemeModeType = 'light' | 'dark' | 'auto';

/**
 * 内置主题类型
 */
export type BuiltinThemeType =
  | 'custom'
  | 'deep-blue'
  | 'deep-green'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'red'
  | 'rose'
  | 'sky-blue'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc'
  | (Record<never, never> & string);

/**
 * 预设的内置主题
 */
export interface BuiltinThemePreset {
  // 主题颜色
  color: string;
  // dark模式的初始颜色
  darkPrimaryColor?: string;
  // 初始颜色
  primaryColor?: string;
  type: BuiltinThemeType;
}
