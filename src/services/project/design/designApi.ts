import { HttpRequest } from "@/utils/request";

export enum DesignApi {
  /**
   * 获取项目设计列表
   */
  getProjectList = "/engine/project/getProjectList",
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
