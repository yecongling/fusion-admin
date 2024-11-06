import { HttpRequest } from '@utils/request';

/**
 * 枚举菜单相关的请求API
 */
export enum Api {
  // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
  getMenuList = '/system/menu/getMenusByRole',
  // 获取所有菜单
  getAllMenus = '/system/menu/getAllMenus',
  // 获取所有上级菜单
  getDirectoryMenu = '/system/menu/getDirectoryMenu',
  // 添加菜单
  addMenu = '/system/menu/addMenu',
  // 编辑菜单
  updateMenu = '/system/menu/updateMenu',
  // 删除菜单
  deleteMenu = '/system/menu/deleteMenu',
}

/**
 * 根据角色获取菜单
 * @param params
 * @returns
 */
export const getMenuListByRoleId = (params: any) => {
  return HttpRequest.get(
    {
      url: Api.getMenuList,
      params,
    },
    { successMessageMode: 'none' },
  );
};

/**
 * 查询所有菜单
 * @param params 查询条件
 */
export const getAllMenus = (params: Record<string, any>) => {
  return HttpRequest.get(
    {
      url: Api.getAllMenus,
      params,
    },
    {
      successMessageMode: 'none',
    },
  );
};
