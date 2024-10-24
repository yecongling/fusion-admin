import React, { memo, useState } from "react";
import { Layout, Image, Spin, Menu, MenuProps, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCollapse } from "@stores/store.ts";
import favicon from "@assets/svg/vite.svg";
import { Link, useLocation } from "react-router-dom";

import "./leftMenu.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

/**
 * 左边的菜单栏
 */
const LeftMenu: React.FC = memo(() => {
  // 从状态库中获取状态
  const globalState = useSelector((state: RootState) => state.global);
  const { menus, theme, collapse, menuWidth } = globalState;
  console.log(menuWidth, theme, collapse);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  // 定义一些状态变量
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const titleColor = theme === "dark" ? "#fff" : "#1890ff";
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
