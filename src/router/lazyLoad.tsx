import React from "react";

/**
 * 路由懒加载
 * @param param0 模块名
 * @returns
 */
export const LazyLoad = (moduleName: string) => {
  // 文件直接来自 views 目录，匹配的文件名以 `.tsx` 结尾。
  const viewModule = import.meta.webpackContext("../views", {
    // 是否搜索子目录
    recursive: true,
    // 匹配文件
    regExp: /\.tsx$/
  });
  //页面地址
  let URL = "";
  if (moduleName.endsWith(".tsx")) {
    URL = `./${moduleName}`;
  } else {
    URL = `./${moduleName}/index.tsx`;
  }
  const Module =
    (viewModule(`${URL}`) as any).default || (() => import("@views/error/404"));
  return <Module />;
};
