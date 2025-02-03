import { HttpRequest } from "@/utils/request";
import type { UserModel } from "./userModel";

/**
 * 用户信息操作枚举
 */
export enum UserAction {
  /**
   * 创建用户
   */
  addUser = "/system/user/addUser",

  /**
   * 删除用户
   */
  deleteUser = "/system/user/deleteUser",

  /**
   * 批量删除用户
   */
  deleteUsers = "/system/user/deleteUsers",

  /**
   * 更新用户
   */
  modifyUser = "/system/user/updateUser",

  /**
   * 查询用户
   */
  getUserList = "/system/user/queryUserList",
}

/**
 * 分页查询参数
 */
export interface PageQueryParams {
  /**
   * 当前页码
   */
  pageNum: number;

  /**
   * 每页显示数量
   */
  pageSize: number;
}

/**
 * 用户信息查询参数
 */
export interface UserSearchParams {
  /**
   * 用户名
   */
  username?: string;

  /**
   * 性别
   */
  sex?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 删除标志
   */
  delFlag?: string;
}

/**
 * 用户信息服务接口
 */
export interface IUserService {
  /**
   * 创建用户
   * @param user 用户信息
   * @returns 创建结果
   */
  createUser(user: UserModel): Promise<boolean>;

  /**
   * 删除用户
   * @param id 用户ID
   * @returns 删除结果
   */
  deleteUser(id: string): Promise<boolean>;

  /**
   * 批量删除用户
   * @param ids 用户ID列表
   * @returns 删除结果
   */
  deleteUsers(ids: string[]): Promise<boolean>;

  /**
   * 更新用户
   * @param user 用户信息
   * @returns 更新结果
   */
  updateUser(user: UserModel): Promise<boolean>;

  /**
   * 查询用户
   * @param pageParams 分页参数
   * @param searchParams 搜索参数
   * @returns 用户列表
   */
  queryUsers(
    pageParams: PageQueryParams,
    searchParams?: UserSearchParams
  ): Promise<Record<string, any>>;
}

/**
 * 用户信息服务实现
 */
export const userService: IUserService = {
  /**
   * 创建用户
   * @param user 用户信息
   * @returns 创建结果
   */
  async createUser(user: UserModel): Promise<boolean> {
    const response = await HttpRequest.post({
      url: UserAction.addUser,
      params: user,
    });
    return response;
  },
  /**
   * 删除用户
   * @param id 用户ID
   * @returns 删除结果
   */
  async deleteUser(id: string): Promise<boolean> {
    const response = await fetch(`${UserAction.deleteUser}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },

  /**
   * 批量删除用户
   * @param ids 用户ID列表
   * @returns 删除结果
   */
  async deleteUsers(ids: string[]): Promise<boolean> {
    const response = await fetch(UserAction.deleteUser, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });
    return response.ok;
  },

  /**
   * 更新用户
   * @param user 用户信息
   * @returns 更新结果
   */
  async updateUser(user: UserModel): Promise<boolean> {
    const response = await fetch(UserAction.modifyUser, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.ok;
  },

  /**
   * 查询用户
   * @param pageParams 分页参数
   * @param searchParams 搜索参数
   * @returns 用户列表
   */
  async queryUsers(
    pageParams: PageQueryParams,
    searchParams?: UserSearchParams
  ): Promise<Record<string, any>> {
    const params = { ...pageParams, searchParams };
    const response = await HttpRequest.post(
      {
        url: UserAction.getUserList,
        params,
      },
      {
        successMessageMode: "none",
      }
    );
    return response;
  },
};
