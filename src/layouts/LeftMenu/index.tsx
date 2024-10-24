import React, { memo, useCallback, useEffect, useState } from "react";
import { Layout, Image, Spin, Menu, MenuProps, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCollapse } from "@stores/store.ts";
import favicon from "@assets/svg/vite.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./leftMenu.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { RouteItem } from "@type/route";
import { addIcon, getOpenKeys, searchRoute } from "@utils/utils";

type MenuItem = Required<MenuProps>["items"][number];

/**
 * 左边的菜单栏
 */
const LeftMenu: React.FC = memo(() => {
  // 从状态库中获取状态
  const globalState = useSelector((state: RootState) => state.global);
  const { menus, theme, collapse, menuWidth } = globalState;
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const navigate = useNavigate();
  // 定义一些状态变量
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const titleColor = theme === "dark" ? "#fff" : "#1890ff";

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: RouteItem[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: RouteItem) => {
      // 如果不能显示的菜单不显示
      if (item?.meta?.menuType === 2) {
        return true;
      }
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) {
        return newArr.push(
          getItem(item.meta?.title, item.path, addIcon(item.meta?.icon))
        );
      }
      newArr.push(
        getItem(
          item.meta?.title,
          item.path,
          addIcon(item.meta?.icon),
          deepLoopFloat(item.children)
        )
      );
    });
    return newArr;
  };

  /**
   * 菜单点击跳转
   */
  const clickMenu: MenuProps["onClick"] = useCallback(
    ({ key }: { key: string }) => {
      // 配置外置跳转路由
      // if (route.meta.isLink) window.open(route.meta.isLink, "_blank");
      navigate(key);
      // 可以通过这里去查询菜单路由，以此构建面包屑
      // const route = searchRoute(key, menus);
      // const title = route.meta?.title;
      // if (title) {
      //   document.title = title + "-integration";
      // }
    },
    []
  );

  // 刷新页面菜单保持高亮
  useEffect(() => {
    const openKey = getOpenKeys(pathname);
    // 判断如果是二级路由，不在左边菜单那种的就不去更新
    const route = searchRoute(pathname, menus);
    if (!route || Object.keys(route).length === 0) {
      return;
    }
    const title = route.meta?.title;
    if (title) {
      document.title = title + "-integration";
    }
    !collapse && setOpenKeys(openKey);
    setSelectedKeys(openKey.concat([pathname]));
  }, [pathname, collapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 组件挂载加载菜单
  useEffect(() => {
    if (!menus || menus.length === 0) return;
    setLoading(true);
    setMenuList(deepLoopFloat(menus, []));
    setLoading(false);
  }, []);

  return (
    <Layout.Sider
      trigger={null}
      collapsedWidth={48}
      className="scroll ant-menu"
      style={{
        overflowX: "hidden",
        zIndex: 999,
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.08)",
      }}
      collapsible
      width={menuWidth}
      theme={theme}
      collapsed={collapse}
    >
      <div className="dis-fl jc-sb ai-ct toolbox">
        <Link to="/" style={{ width: "100%" }}>
          <div
            className="hd-64 mgr-01 dis-fl ai-ct jc-ct"
            style={{ justifyContent: "space-around" }}
          >
            <Image width={25} src={favicon} preview={false} />
            {collapse ? (
              ""
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0 12px",
                  fontSize: "20px",
                  color: titleColor,
                }}
              >
                FusionAdmin
              </p>
            )}
          </div>
        </Link>
      </div>
      <Spin wrapperClassName="side-menu" spinning={loading} tip="加载中">
        <Menu
          mode="inline"
          theme={theme}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuList}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        />
      </Spin>
      <div
        className="collapse"
        style={{
          display: "flex",
          justifyContent: collapse ? "center" : "end",
        }}
      >
        <Button
          type="text"
          size="small"
          style={{
            cursor: "pointer",
            fontSize: "16px",
          }}
          icon={
            collapse ? (
              <MenuUnfoldOutlined
                style={{ color: theme === "dark" ? "white" : "black" }}
              />
            ) : (
              <MenuFoldOutlined
                style={{ color: theme === "dark" ? "white" : "black" }}
              />
            )
          }
          onClick={() => dispatch(setCollapse(!collapse))}
          className="btnbor"
        />
      </div>
    </Layout.Sider>
  );
});

export default LeftMenu;
