import { Navigate, useRoutes } from "react-router-dom";
import { LazyLoad } from "./lazyLoad";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { App, Skeleton } from "antd";
import { antdUtils } from "@utils/antdUtil";
import { RootState } from "@stores/store";
import { handleRouter } from "@utils/utils";
import { RouteObject } from "@type/route";
import { ErrorBoundary } from "./ErrorBoundary";
import { useSelector } from "react-redux";

// 默认的错误路由
const errorRoutes: RouteObject[] = [
  {
    path: "*",
    component: () => <Navigate replace to="/404" />,
  },
  {
    path: "/500",
    component: LazyLoad("500.tsx").type,
  },
  {
    path: "/404",
    component: LazyLoad("404.tsx").type,
  },
  {
    path: "/403",
    component: LazyLoad("403.tsx").type,
  },
];

// 动态路由
export const dynamicRoutes: RouteObject[] = [
  {
    path: "/",
    component: React.lazy(
      () => import("@layouts/index.tsx")
    ) as unknown as ReactNode,
    children: [],
  },
  {
    path: "/login",
    component: LazyLoad("Login").type,
  },
];

// 路由处理方式
const generateRouter = (routers: RouteObject[]) => {
  return routers.map((item: any) => {
    if (item.index) {
      return item;
    }
    item.element = (
      <ErrorBoundary>
        <Suspense fallback={<Skeleton />}>
          <item.component />
        </Suspense>
      </ErrorBoundary>
    );
    if (item.children) {
      item.children = generateRouter(item.children);
      if (item.children.length) {
        item.children.unshift({
          index: true,
          element: <Navigate to={item.children[0].path} replace />,
        });
      }
    }
    return item;
  });
};

/**
 * 路由部分
 */
export const Router = () => {
  // 方便非react组件内部使用
  const { notification, message, modal } = App.useApp();
  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  const [route, setRoute] = useState([...dynamicRoutes]);

  // 从store中获取
  const global = useSelector((state: RootState) => state.global);
  const { menus } = global;

  useEffect(() => {
    route[0].children = [...handleRouter(menus), ...errorRoutes];
    setRoute([...route]);
  }, [menus]);
  return useRoutes(generateRouter(route));
};
