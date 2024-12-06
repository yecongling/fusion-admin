/**
 * 枚举端点相关的请求API
 */

import { HttpRequest } from '@/utils/request';

export enum Api {
  /**
   * 获取所有端点配置列表
   */
  queryEndpointConfigType = '/engine/endpointConfig/queryEndpointConfigType',
}

/**
 * 获取所有端点配置列表
 * @param params
 */
export const queryEndpointConfigType = (params?: string) => {
  return HttpRequest.get({
    url: Api.queryEndpointConfigType,
    params: { name: params },
  });
};
