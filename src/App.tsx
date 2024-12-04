import { type RootState, setMenus } from '@stores/store';
import { ConfigProvider, Spin, App as AntdApp } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Router } from '@router/router';
import { getMenuListByRoleId } from '@services/system/menu/menuApi';
import { antdUtils } from '@utils/antdUtil';

/**
 * 主应用
 */
const App: React.FC = () => {
  // 触发更新的钩子函数
  const dispatch = useDispatch();
  // 获取数据的钩子函数
  const global = useSelector((state: RootState) => state.globalState);
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
  const getMenuData = async () => {
    const roleId = sessionStorage.getItem('roleId') || '';
    return await getMenuListByRoleId({ roleId });
  };

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
      setLoading(true);
      try {
        // 模拟从后台获取数据
        getMenuData()
          .then((menu) => {
            return dispatch(setMenus(menu));
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (e) {
        notification.error({
          message: '菜单加载失败',
          description: `原因：${e}`,
          duration: 0,
        });
        setLoading(false);
      }
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: global.colorPrimary,
        },
        components: {
          Layout: {
            headerPadding: '0 16px 0 0',
            headerHeight: '50px',
            headerBg: '#fff',
          },
        },
      }}
      locale={zhCN}
    >
      {loading ? (
        <Spin percent="auto" fullscreen style={{ fontSize: 48 }} />
      ) : (
        <Router />
      )}
    </ConfigProvider>
  );
};
export default App;
