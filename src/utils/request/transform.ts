/**
 * axios中对数据的中转处理
 */
/* 数据处理 */
import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { RequestOptions } from '@type/axios';
import { Response } from '@type/global';
import { antdUtils } from '../antdUtil';
import { joinTimestamp } from './helper';
import { HttpCodeEnum, RequestEnum } from '@enums/httpEnum';
import { setObjToUrlParams } from '../utils';
import { isString } from '../is';
import { encrypt } from '../encrypt';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

/**
 * 封装一些需要进行数据转换或处理的配置
 */
export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig;

  /**
   * 响应数据转换
   */
  transformResponseHook?: (
    res: AxiosResponse<Response>,
    options: RequestOptions,
  ) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}

/**
 * 定义一些拦截器的具体实现
 */
export const transform: AxiosTransform = {
  /**
   * 处理响应数据
   * @param res
   * @param options
   */
  transformResponseHook: (
    res: AxiosResponse<Response>,
    options: RequestOptions,
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回响应数据
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const { data } = res;
    if (!data) {
      throw new Error('api接口请求失败，没有返回数据');
    }
    const { code, data: rtn, message: msg } = data;
    // 系统默认200状态码为正常成功请求，可在枚举中配置自己的
    const hasSuccess =
      data && Reflect.has(data, 'code') && code === HttpCodeEnum.SUCCESS;
    if (hasSuccess) {
      if (msg && options.successMessageMode === 'success') {
        // 信息成功提示
        antdUtils.message?.success(msg);
      }
      return rtn;
    }
    let timeoutMsg = '';
    switch (code) {
      case HttpCodeEnum.RC401:
        timeoutMsg = '接口请求超时';
        // setToken("");
        // window.location.href = "/login";
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }
    if (options.errorMessageMode === 'modal') {
      if (code === HttpCodeEnum.RC401) {
        antdUtils.modal?.confirm({
          title: '凭证失效',
          content: '当前用户身份验证凭证已过期或无效，请重新登录！',
          onOk() {
            // 登录失效后需要将本地token清除
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('isLogin');
            sessionStorage.removeItem('roleId');
            window.location.href = '/login';
          },
        });
      } else {
        antdUtils.modal?.error({ title: '错误提示', content: timeoutMsg });
      }
    } else if (options.errorMessageMode === 'message') {
      antdUtils.message?.error(timeoutMsg);
    }
    throw new Error(timeoutMsg || '接口请求失败');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      joinTime = true,
      urlPrefix,
    } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (
      config.method?.toUpperCase() === RequestEnum.GET ||
      config.method?.toUpperCase() === RequestEnum.DELETE
    ) {
      if (!isString(params)) {
        // 给get请求加上事件戳参数，避免从缓存中拿数据
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false),
        );
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非get请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * 请求拦截器处理（主要用于处理如token的传入，授权信息等，或请求头里的一些特殊参数）
   * @param config
   * @param options
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理token
    const token = sessionStorage.getItem('token');
    if (token && options?.requestOptions?.withToken !== false) {
      config.headers['token'] = token;
    }
    const cpt = options?.requestOptions?.encrypt;
    // 进行数据加密
    if (config.data && cpt === 1) {
      // 判定json数据需要转为json字符串才能加密
      if (
        typeof config.data === 'object' &&
        (config.headers['Content-Type'] === 'application/json' ||
          config.headers['Content-Type'] === 'application/json;charset=UTF-8')
      ) {
        config.data = JSON.stringify(config.data);
        // 并且修改axios内部的transformRequest(不然如果传的json，加密后axios会默认转json字符串，后台接收到的会多双引号)
        config.transformRequest = (data) => data;
      }
      const result = encrypt(config.data);
      config.data = result.data;
      // 将秘钥放到请求头里面
      config.headers['X-Encrypted-Key'] = result.key;
    }
    // 将加密配置放到请求头里面
    config.headers['X-Encrypted'] = cpt;
    return config;
  },

  /**
   * 响应拦截器处理
   * @param res
   */
  responseInterceptors: (res: AxiosResponse) => {
    return res;
  },

  /**
   * 响应错误处理
   * @param error
   */
  responseInterceptorsCatch: (error: any) => {
    const err: string = error?.toString?.() ?? '';
    const { code, message } = error || {};
    let errMessage = '接口请求错误';
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '接口请求超时';
    }
    if (err?.includes('Network Error')) {
      errMessage = '网络异常';
    }
    if (errMessage) {
      antdUtils.message?.error(errMessage);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
};
