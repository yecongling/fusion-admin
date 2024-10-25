/**
 * 全局的状态（如系统设置、主题等）
 */

export interface GlobalState {
  // 主题
  theme: 'dark' | 'light';
  // 侧边栏收缩
  collapse: boolean;
  // 侧边栏未收缩下的宽度
  menuWidth: number | string;
  // 默认颜色
  colorPrimary: string;
  // 菜单
  menus: any[];
}

// 定义初始全局状态
export const initGlobalState: GlobalState = {
  // 主题
  theme: 'light',
  // 侧边栏是否收缩
  collapse: false,
  menuWidth: 220,
  // 系统默认主体色
  colorPrimary: '#1677ff',
  // 菜单
  menus: [],
};
