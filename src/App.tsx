import { Spin, App as AntdApp, Skeleton } from 'antd';
import type React from 'react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Router } from '@/router/router';
import { getMenuListByRoleId } from '@/api/system/menu/menuApi';
import { antdUtils } from '@/utils/antdUtil';
import { useMenuStore } from './stores/store';

/**
 * 主应用
 */
const App: React.FC = () => {
  // 触发更新的钩子函数
  const { setMenus } = useMenuStore();
  // 应用加载中
  const [loading, setLoading] = useState<boolean>(false);
  // 路由跳转
  const navigate = useNavigate();
  const location = useLocation();
  // 方便非react组件内部使用
  const { notification, message, modal } = AntdApp.useApp();

  /**
   * 查询用户的菜单信息
   */
  const getMenuData = useCallback(async () => {
    const roleId = sessionStorage.getItem('roleId') || '';
    try {
      const menu = await getMenuListByRoleId({ roleId });
      setMenus(menu); // 更新 状态
    } catch (e: unknown) {
      notification.error({
        message: '菜单加载失败',
        description: `原因：${e instanceof Error ? e.message : '未知错误'}`,
        duration: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载完成后加载用户菜单
  useEffect(() => {
    // 设置antd组件的实例(用于非react组件内部使用)
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
    // 去后台查询菜单，也需要判定当前是否登录，未登录的话就跳转登录页面
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'false' || !isLogin || location.pathname === '/login') {
      navigate('/login');
    } else {
      getMenuData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spin size="large" fullscreen style={{ fontSize: 48 }} />
      ) : (
        <Suspense fallback={<Skeleton />}>
          <Router />
        </Suspense>
      )}
    </>
  );
};
export default App;
