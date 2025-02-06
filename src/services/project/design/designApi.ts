import { HttpRequest } from "@/utils/request";
import type { ProjectModel } from "./projectModel";
import type { PageQueryParams } from "@/types/global";

export enum DesignApi {
  /**
   * 获取项目设计列表
   */
  getProjectList = "/engine/project/getProjectList",
}

/**
 * 项目查询参数
 */
export interface ProjectSearchParams {
  /**
   * 项目名称
   */
  name?: string;
}

/**
 * 项目服务接口
 */
export interface IDesignService {
  
  /**
   * 获取项目列表
   * @param pageParams 分页参数
   * @param searchParams 参数
   * @returns 结果
   */
  getProjectList(
    pageParams: PageQueryParams,
    searchParams?: ProjectSearchParams
  ): Promise<Record<string, any>>;

  /**
   * 新增项目
   * @param params 项目信息
   */
  addProject(params: ProjectModel): Promise<boolean>;
}

/**
 * 获取项目列表
 * @param params 参数
 * @returns 结果
 */
export const getProjectList = (params?: any) => {
  return HttpRequest.post(
    {
      url: DesignApi.getProjectList,
      data: params,
    },
    {
      successMessageMode: "none",
    }
  );
};
