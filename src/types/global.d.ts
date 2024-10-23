/**
 * 定义ajax请求的相应结果
 */
export interface Result<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}
