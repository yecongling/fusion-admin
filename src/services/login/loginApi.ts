import { HttpRequest } from '@utils/request';
import { Response } from '@type/global';

/**
 * 枚举登录需要的接口地址
 */
export enum LoginApi {
  /**
   * 登录
   */
  login = '/login',

  /**
   * 退出登录
   */
  logout = '/logout',
  /**
   * 获取验证码
   */
  getCode = '/getCode',
}

/**
 * 登录接口的实现
 */
export const login = (params: any) => {
  return HttpRequest.post<Response>(
    {
      url: LoginApi.login,
      data: params,
    },
    { isTransformResponse: false },
  );
};

/**
 * 获取验证码
 * @returns 验证码
 */
export const getCode = () => {
  return HttpRequest.get({
    url: LoginApi.getCode,
  });
};

/**
 * 用户退出登录
 * @param token 用户token
 */
export const logout = (token: string) => {
  HttpRequest.delete({ url: LoginApi.logout, params: { token } });
};
