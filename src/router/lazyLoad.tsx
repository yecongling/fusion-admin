import React from "react";

/**
 * 路由懒加载
 * @param param0 模块名
 * @returns 
 */
export const LazyLoad: React.FC<{ moduleName: string }> = ({ moduleName }) => {
  // 文件直接来自 views 目录，匹配的文件名以 `.tsx` 结尾。
  const viewModule = import.meta.webpackContext("../views", {
    // 是否搜索子目录
    recursive: true,
    // 匹配文件
    regExp: /\.tsx$/,
    mode: "lazy",
  });
  //页面地址
  let URL = "";
  if (moduleName.endsWith(".tsx")) {
    URL = `../views/${moduleName}`;
  } else {
    URL = `../views/${moduleName}/index.tsx`;
  }
  const Module = React.lazy(
    (viewModule(`${URL}`) as any) ?? (() => import("@views/404"))
  );
  return <Module />;
};
