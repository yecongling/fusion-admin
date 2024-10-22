import { Navigate, useRoutes } from "react-router-dom"
import { LazyLoad } from "./lazyLoad"
import React, { Suspense, useEffect, useState } from "react";
import { App, Skeleton } from "antd";
import { antdUtils } from "@utils/antdUtil";
import { useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { handleRouter } from "@utils/utils";
import { RouteObject } from "@type/route";

const errorRoutes: RouteObject[] = [
    {
        path: "*",
        component: <Navigate replace to={"/404"} />
    },
    {
        path: "/500",
        component: LazyLoad("500.tsx")
    },
    {
        path: "/404",
        component: LazyLoad("404.tsx")
    }
];

// 动态路由
export const dynamicRoutes: RouteObject[] = [
    {
        path: "/",
        component: React.lazy(() => import("@layouts/index")) as unknown as React.ReactNode,
        children: []
    },
    {
        path: "/login",
        component: LazyLoad("Login").type
    }
];

// 路由处理方式
const generateRouter = (routers: RouteObject[]) => {
    return routers.map((item: any) => {
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
}

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
        setRoute([...route])
    }, [menus]);
    return useRoutes(generateRouter(route));
}