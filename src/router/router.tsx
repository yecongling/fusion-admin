import { Navigate, useRoutes } from 'react-router-dom';
import { LazyLoad } from './lazyLoad';
import React, { type ReactNode, Suspense, useEffect, useState } from 'react';
import { App, Skeleton } from 'antd';
import { antdUtils } from '@utils/antdUtil';
import type { RootState } from '@stores/store';
import { handleRouter } from '@utils/utils';
import type { RouteObject } from '@type/route';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorBoundary';

// 默认的错误路由
const errorRoutes: RouteObject[] = [
  {
    path: '*',
    component: () => <Navigate replace to="/404" />,
  },
  {
    path: '/500',
    component: LazyLoad('error/500.tsx').type,
  },
  {
    path: '/404',
    component: LazyLoad('error/404.tsx').type,
  },
  {
    path: '/403',
    component: LazyLoad('error/403.tsx').type,
  },
];

// 动态路由
export const dynamicRoutes: RouteObject[] = [
  {
    path: '/',
    component: React.lazy(
      () => import('@layouts/index.tsx'),
    ) as unknown as ReactNode,
    children: errorRoutes,
  },
  {
    path: '/login',
    component: LazyLoad('Login').type,
  },
];

// 路由处理方式
const generateRouter = (routers: RouteObject[]) => {
  return routers.map((item: any) => {
    /**
     * 错误边界组件（用于单个页面渲染错误的时候显示，单个模块渲染失败不应该影响整个系统的渲染失败）
     */
    item.ErrorBoundary = <ErrorBoundary fallback={<ErrorFallback />} />;
    if (item.index) {
      return item;
    }
    item.element = (
      <Suspense fallback={<Skeleton />}>
        <item.component />
      </Suspense>
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
  // 取不到菜单数据默认空数组，避免handleRouter处理错误
  const { menus = [] } = global;

  useEffect(() => {
    route[0].children = [...handleRouter(menus), ...errorRoutes];
    setRoute([...route]);
  }, [menus]);
  return useRoutes(generateRouter(route));
};
