import { AlertOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import type React from 'react';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN';
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

export type ThemeModeType = 'light' | 'dark' | 'auto';

export const THEME_PRESET: Array<{
  icon: React.ReactNode;
  name: ThemeModeType;
}> = [
  {
    icon: <SunOutlined style={{fontSize: '20px', margin: '0 36px'}}/>,
    name: 'light',
  },
  {
    icon:<MoonOutlined style={{fontSize: '20px', margin: '0 36px'}} />,
    name: 'dark',
  },
  {
    icon: <AlertOutlined style={{fontSize: '20px', margin: '0 36px'}} />,
    name: 'auto',
  },
];
