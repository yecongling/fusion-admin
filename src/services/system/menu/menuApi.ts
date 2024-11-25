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
  getDirectory = '/system/menu/getDirectory',
  // 添加菜单
  addMenu = '/system/menu/addMenu',
  // 编辑菜单
  updateMenu = '/system/menu/updateMenu',
  // 删除菜单
  deleteMenu = '/system/menu/deleteMenu',
  // 批量删除菜单
  deleteMenuBatch = '/system/menu/deleteMenuBatch',
  // 导出（Excel）
  exportMenus = '/system/menu/export',
  // 批量导入
  importMenus = '/system/menu/import',
  // 验证菜单权限
  checkPermission = '/system/menu/checkPermission'
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
  return HttpRequest.post(
    {
      url: Api.getAllMenus,
      params,
    },
    {
      successMessageMode: 'none',
    },
  );
};

/**
 * 获取所有的一级菜单
 * @returns 
 */
export const getDirectory = () => {
  return HttpRequest.get({ url: Api.getDirectory }, { successMessageMode: 'none' });
};

/**
 * 新增菜单
 * @param params 菜单数据
 * @returns
 */
export const addMenu = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: Api.addMenu,
    data: params,
  });
};

/**
 * 修改菜单数据
 * @param params 菜单数据
 * @returns
 */
export const updateMenu = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: Api.updateMenu,
    data: params,
  });
};

/**
 * 删除菜单
 * @param menuId 菜单ID
 * @returns
 */
export const deleteMenu = (menuId: string) => {
  return HttpRequest.delete({
    url: Api.deleteMenu,
    params: menuId,
  });
};

/**
 * 批量删除菜单
 * @param menuIds  选中的菜单
 * @returns
 */
export const deleteMenuBatch = (menuIds: string[]) => {
  return HttpRequest.delete({
    url: Api.deleteMenuBatch,
    data: menuIds,
  });
};

//    下面两个方法都需要进行更改，改为专用的文件导入导出

/**
 * 导出菜单（导出到Excel）
 * @param menus 需要导出的菜单数据
 * @returns
 */
export const exportMenu = (menus: any) => {
  return HttpRequest.post({
    url: Api.exportMenus,
    data: menus,
  });
};

/**
 * 导入菜单（从Excel里面导入）
 * @param file 文件内容（Excel文件）
 * @returns
 */
export const importMenu = (file: any) => {
  return HttpRequest.post({
    url: Api.importMenus,
    data: file,
  });
};

/**
 * 验证菜单权限
 * @param params 菜单数据
 * @returns 结果
 */
export const checkPermission = (params: any) => {
  return HttpRequest.post({
    url: Api.checkPermission,
    data: params,
  });
};