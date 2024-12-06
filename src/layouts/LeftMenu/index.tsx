import type React from 'react';
import { memo, useEffect, useState } from 'react';
import {
  Layout,
  Image,
  Spin,
  Menu,
  type MenuProps,
  Button,
  Divider,
  Space,
  Segmented,
  Tooltip,
  ConfigProvider,
  Empty,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, setCollapse, setTheme } from '@/stores/store.ts';
import favicon from '@/assets/svg/vite.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './leftMenu.scss';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SunOutlined,
} from '@ant-design/icons';
import type { RouteItem } from '@/types/route';
import { addIcon, getOpenKeys, searchRoute } from '@/utils/utils';

type MenuItem = Required<MenuProps>['items'][number];

/**
 * 左边的菜单栏
 */
const LeftMenu: React.FC = memo(() => {
  // 从状态库中获取状态
  const globalState = useSelector((state: RootState) => state.globalState);
  const menuState = useSelector((state: RootState) => state.menuState);
  const { theme, collapse, menuWidth } = globalState;
  const { menus } = menuState;
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const navigate = useNavigate();
  // 定义一些状态变量
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const titleColor = theme === 'dark' ? '#fff' : '#1890ff';

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
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
    for (const item of menuList) {
      // 如果不能显示的菜单不显示
      if (item?.meta?.menuType === 2) {
        continue;
      }
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) {
        newArr.push(
          getItem(item.meta?.title, item.path, addIcon(item.meta?.icon)),
        );
        continue;
      }
      newArr.push(
        getItem(
          item.meta?.title,
          item.path,
          addIcon(item.meta?.icon),
          deepLoopFloat(item.children),
        ),
      );
    }
    return newArr;
  };

  /**
   * 菜单点击跳转
   */
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    // 配置外置跳转路由
    // if (route.meta.isLink) window.open(route.meta.isLink, "_blank");
    navigate(key);
  };

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
      document.title = `Fusion Admin -${title}`;
    }
    if (!collapse) {
      setOpenKeys(openKey);
    }
  }, [pathname, collapse, menus]);

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
    const menu = deepLoopFloat(menus, []);
    setMenuList(menu);
    setLoading(false);
  }, [menus]);

  return (
    <Layout.Sider
      trigger={null}
      collapsedWidth={48}
      className="scroll ant-menu"
      style={{
        overflowX: 'hidden',
        zIndex: 999,
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.08)',
      }}
      collapsible
      width={menuWidth}
      theme={theme}
      collapsed={collapse}
    >
      <div className="dis-fl jc-sb ai-ct toolbox">
        <Link to="/" style={{ width: '100%' }}>
          <div
            className="hd-64 mgr-01 dis-fl ai-ct jc-ct"
            style={{ justifyContent: 'space-around' }}
          >
            <Image width={25} src={favicon} preview={false} />
            {collapse ? (
              ''
            ) : (
              <p
                style={{
                  fontWeight: 'bold',
                  margin: '0 12px',
                  fontSize: '20px',
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
        {menuList.length > 0 ? (
          <Menu
            mode="inline"
            theme={theme}
            defaultSelectedKeys={[pathname]}
            openKeys={openKeys}
            items={menuList}
            onClick={clickMenu}
            onOpenChange={onOpenChange}
          />
        ) : (
          <Empty description={<>暂无菜单，请检查用户角色是否具有菜单！</>} />
        )}
      </Spin>
      <Divider style={{ margin: '8px 0' }} />
      <div
        className="collapse"
        style={{
          height: collapse ? '140px' : '40px',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Space direction={collapse ? 'vertical' : 'horizontal'} align="center">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemHoverColor:
                    theme === 'dark' ? '#eee' : 'rgba(0,0,0,0.88)',
                  itemColor: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  itemSelectedBg: theme === 'dark' ? '#1677ff' : '#fff',
                  itemSelectedColor:
                    theme === 'dark' ? '#fff' : 'rgba(0,0,0,0.88)',
                  trackBg: theme === 'dark' ? '#001529' : '#f5f5f5',
                },
              },
            }}
          >
            <Segmented
              onChange={(value) => dispatch(setTheme(value as any))}
              vertical={collapse}
              size="small"
              options={[
                {
                  label: collapse ? '' : 'light',
                  value: 'light',
                  icon: <SunOutlined />,
                },
                {
                  label: collapse ? '' : 'dark',
                  value: 'dark',
                  icon: <MoonOutlined />,
                },
              ]}
            />
          </ConfigProvider>
          <Tooltip title="帮助文档">
            <Button
              size="small"
              color="default"
              variant="filled"
              shape="circle"
              icon={
                <QuestionCircleOutlined
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                />
              }
            />
          </Tooltip>
          <Button
            size="small"
            color="default"
            variant="filled"
            shape="circle"
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
            icon={
              collapse ? (
                <MenuUnfoldOutlined
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                />
              )
            }
            onClick={() => dispatch(setCollapse(!collapse))}
            className="btnbor"
          />
        </Space>
      </div>
    </Layout.Sider>
  );
});

export default LeftMenu;
