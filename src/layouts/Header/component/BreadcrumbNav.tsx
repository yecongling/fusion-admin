import type React from 'react';
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { RouteItem } from '@type/route';
import { useSelector } from 'react-redux';
import type { RootState } from '@stores/store';

/**
 * 面包屑
 * @return JSX
 */
const BreadcrumbNav: React.FC = () => {
  // 获取路由的地址，地址变化的时候去获取对应的菜单项，以此来拼接面包屑
  const location = useLocation();
  // 从后台获取的路由菜单
  const globalState = useSelector((state: RootState) => state.globalState);
  const { menus } = globalState;
  const [items, setItems] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    // 将menu里面的内容和path进行对照获取
    const breadItems = patchBreadcrumb(menus, location.pathname);
    if (breadItems.length > 0) {
      setItems(breadItems);
    }
    // 设置面包屑内容
  }, [location.pathname, menus]);

  // 组件的DOM内容
  return (
    <>
      <Breadcrumb items={items} />
    </>
  );
};
export default BreadcrumbNav;

/**
 * 根据路径生成面包屑的路径内容
 * @param routerList 菜单集合
 * @param pathname 路径
 * @returns 面包屑内容集合
 */
function patchBreadcrumb(
  routerList: RouteItem[],
  pathname: string,
): Record<string, any>[] {
  const result: Record<string, any>[] = [];
  if (routerList) {
    for (let i = 0; i < routerList.length; i++) {
      const item = routerList[i];
      if (
        pathname === item.path ||
        (pathname.includes(item.path) &&
          pathname.length > item.path.length &&
          pathname.substring(item.path.length, item.path.length + 1) === '/')
      ) {
        const pth: Record<string, any> = {};
        pth.title = (
          <span style={{ padding: '0 4px' }}>{item.meta?.title}</span>
        );
        pth.key = item.path;
        if (pathname === item.path) {
          pth.title = <Link to={item.path}>{item.meta?.title}</Link>;
        }
        result.push(pth);
      }
      if (item.children && item.children.length > 0) {
        const rst = patchBreadcrumb(item.children, pathname);
        if (rst.length > 0) {
          return [...result, ...rst];
        }
      }
    }
  }
  return result;
}
