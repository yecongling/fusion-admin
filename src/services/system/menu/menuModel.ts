import { RouteItem } from '@type/route';

/**
 * 菜单
 */
export interface MenuModel {
  id: string;
  parentId: string;
  name: string;
  url: string;
  component: string;
  componentName: string;
  redirect?: string;
  menuType: number;
  perms?: string;
  permsType?: string;
  sortNo: number;
  alwaysShow: boolean;
  icon: string;
  route?: boolean;
  leaf: boolean;
  keepAlive?: boolean;
  hidden: boolean;
  hideTab?: boolean;
  description?: string;
  delFlag: number;
  ruleFlag?: number;
  status: string;
  internalOrExternal?: boolean;
  children?: MenuModel[];
}

/**
 * 目录
 */
export interface Directory {
  title: string;
  value: string;
  children?: Directory[];
}

export type directoryResult = {
  code: number;
  directory: Directory[];
};
