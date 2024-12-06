/**
 * 枚举端点相关的请求API
 */

import { HttpRequest } from '@/utils/request';

export enum Api {
  /**
   * 获取所有端点配置列表
   */
  getEndpointConfigList = '/system/endpoint/getEndpointConfigList',
}

/**
 * 获取所有端点配置列表
 * @param params
 */
export const getEndpointConfigList = (params: Record<string, any>) => {
  return HttpRequest.get({
    url: Api.getEndpointConfigList,
    params,
  });
};
