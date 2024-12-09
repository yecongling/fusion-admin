/**
 * 枚举端点相关的请求API
 */

import { HttpRequest } from '@/utils/request';

export enum Api {
  /**
   * 获取所有端点配置列表
   */
  queryEndpointConfigType = '/engine/endpointConfig/queryEndpointConfigType',

  /**
   * 新增端点类型
   */
  addEndpointType = '/engine/endpointConfig/addEndpointType',

  /**
   * 修改端点类型
   */
  updateEndpointType = '/engine/endpointConfig/updateEndpointType',
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

/**
 * 新增端点类型
 * @param params 端点数据
 * @returns
 */
export const addEndpointType = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: Api.addEndpointType,
    data: params,
  });
};

/**
 * 修改端点类型
 * @param params 端点数据
 * @returns
 */
export const updateEndpointType = (params: Record<string, any>) => {
  return HttpRequest.post({
    url: Api.updateEndpointType,
    data: params,
  });
};
