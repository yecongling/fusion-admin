import { HttpRequest } from "@utils/request";

/**
 * 枚举菜单相关的请求API
 */
export enum Api {
  // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
  getMenuList = "/system/menu/getMenusByRole",
  // 获取所有菜单
  getAllMenus = "/system/menu/getAllMenus",
  // 获取所有上级菜单
  getDirectoryMenu = "/system/menu/getDirectoryMenu",
  // 添加菜单
  addPermission = "/system/menu/addPermission",
  // 编辑菜单
  updatePermission = "/system/menu/updatePermission",
  // 删除菜单
  deletePermission = "/system/menu/deletePermission",
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
    { successMessageMode: "none" }
  );
};
