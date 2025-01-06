import { HttpRequest } from "@/utils/request";
import type { SysRole } from "./roleModel";

/**
 * 枚举角色相关的api
 */
export enum RoleApi {
  /**
   * 获取角色列表
   */
  getRoleList = "/system/role/getRoleList",
  /**
   * 获取角色详情
   */
  getRoleDetail = "/system/role/detail",
  /**
   * 新增角色
   */
  addRole = "/system/role/addRole",
  /**
   * 编辑角色
   */
  editRole = "/system/role/editRole",

  /**
   * 改变角色状态
   */
  changeStatus = "/system/role/changeStatus",
}

/**
 * 查询角色列表
 * @param params 角色参数
 * @returns 角色列表
 */
export const getRoleList = (params: any) => {
  return HttpRequest.post<SysRole[]>(
    {
      url: RoleApi.getRoleList,
      data: params,
    },
    {
      successMessageMode: "none",
    }
  );
};

/**
 * 新增角色
 * @param params 角色参数
 * @returns 结果
 */
export const addRole = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: RoleApi.addRole,
    data: params,
  });
};

/**
 * 编辑角色信息
 * @param params 角色参数
 * @returns 结果
 */
export const editRole = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: RoleApi.editRole,
    data: params,
  });
};

/**
 * 更新角色状态
 * @param params 角色参数
 * @returns 结果
 */
export const changStatus = (params: Record<string, any>) => {
  return HttpRequest.patch({
    url: RoleApi.changeStatus,
    data: params,
  });
};
