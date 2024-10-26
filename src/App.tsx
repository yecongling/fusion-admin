import { RootState, setMenus } from '@stores/store';
import { App as AntdApp, ConfigProvider, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Router } from '@router/router';
import { getMenuListByRoleId } from '@services/system/menu/menuApi';

/**
 * 主应用
 */
const App: React.FC = () => {
  // 触发更新的钩子函数
  const dispatch = useDispatch();
  // 获取数据的钩子函数
  const global = useSelector((state: RootState) => state.global);
  // 应用加载中
  const [loading, setLoading] = useState<boolean>(false);
  // 路由跳转
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 查询用户的菜单信息
   */
  const getMenuData = async () => {
    const roleId = sessionStorage.getItem('roleId') || 'admin';
    return await getMenuListByRoleId({ roleId });
  };

  // 组件挂载完成后加载用户菜单
  useEffect(() => {
    // 去后台查询菜单，也需要判定当前是否登录，未登录的话就跳转登录页面
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'false' || !isLogin || location.pathname === '/login') {
      navigate('/login');
    } else {
      setLoading(true);
      try {
        // 模拟从后台获取数据
        getMenuData().then((menu) => {
          if (!menu) return;
          dispatch(setMenus(menu));
        });
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: global.colorPrimary }, components: {
        Layout: {
          headerPadding: '0 16px 0 0',
          headerHeight: '50px',
          headerBg: '#fff'
        }
      } }}
      locale={zhCN}
    >
      <AntdApp style={{ height: '100%' }}>
        {loading ? (
          <Spin percent="auto" fullscreen style={{ fontSize: 48 }} />
        ) : (
          <Router />
        )}
      </AntdApp>
    </ConfigProvider>
  );
};
export default App;
