import { Navigate, useRoutes } from 'react-router-dom';
import { LazyLoad } from './lazyLoad';
import React, { type ReactNode, useMemo } from 'react';
import type { RouteObject } from '@/types/route';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorBoundary';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import { handleRouter } from '@/utils/utils';

// 默认的错误路由
export const errorRoutes: RouteObject[] = [
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
      () => import('@/layouts/index.tsx'),
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
    item.element = <item.component />;
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
  // 从store中获取
  const menuState = useSelector((state: RootState) => state.menuState);
  // 取不到菜单数据默认空数组，避免handleRouter处理错误
  const { menus = [] } = menuState;
  // 使用useMemo 缓存处理后的路由
  const memoizedRoutes = useMemo(() => {
    // 确保动态路由只有在菜单数据变化时才重新生成
    dynamicRoutes[0].children = [...handleRouter(menus), ...errorRoutes];
    return generateRouter(dynamicRoutes);
  }, [menus]);
  return useRoutes(memoizedRoutes);
};
