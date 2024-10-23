import * as Icons from "@ant-design/icons";
import { isObject } from "./is";
import React from "react";
import { RouteItem, RouteObject } from "@type/route";
import { LazyLoad } from "@router/lazyLoad";

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param newArr
 * @return array
 */
export function handleRouter(
  routerList: RouteItem[],
  newArr: RouteObject[] = []
) {
  routerList.forEach((item: RouteItem) => {
    const menu: RouteObject = {};
    if (typeof item === "object" && item.path && item.route == "1") {
      menu["path"] = item.path;
      menu["component"] = LazyLoad(item.component).type;
      newArr.push(menu);
    }
    if (item.children && item.children.length) {
      menu.children = [];
      handleRouter(item.children, newArr);
    }
    if (item.childrenRoute && item.childrenRoute.length) {
      menu.children = [];
      handleRouter(item.childrenRoute, newArr);
    }
  });
  return newArr;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}

export function deepMerge<T = object>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description 递归查询对应的路由
 * @param path 当前访问地址
 * @param routes 路由列表
 * @returns array
 */
export const searchRoute = (
  path: string,
  routes: RouteItem[] = []
): RouteItem => {
  let result: RouteItem = {
    component: "",
    path: "",
  };
  for (const item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

// 动态渲染 Icon 图标(目前仅考虑使用react-icons/ai里面的，后面这里进行扩展，动态使用react)
const customIcons: { [key: string]: any } = Icons;
export const addIcon = (name: string | undefined) => {
  if (!name || !customIcons[name]) {
    return null;
  }
  return React.createElement(customIcons[name]);
};

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr: string = "";
  const newArr: any[] = [];
  const arr = path.split("/").map((i) => "/" + i);
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    newArr.push(newStr);
  }
  return newArr;
};

/**
 * 将后台拿到的数据映射成包含key的数据，用于react相关组件
 * @param data 数据
 * @param key 数据中的唯一字段
 * @returns 映射的数据
 */
export const addKeyToData = (data: any[], key: string) => {
  return data.map((item) => {
    const newItem = { ...item, key: item[key] };
    if (item.children) {
      newItem.children = addKeyToData(item.children, key);
    }
    return newItem;
  });
};
