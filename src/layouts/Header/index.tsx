import {
  BellOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  App,
  Avatar,
  Badge,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Space,
  Tooltip,
} from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCache, setScreenLock } from '@stores/store';
import avatar from '@assets/images/avatar.png';
import MessageBox from './component/MessageBox';
import FullScreen from './component/FullScreen';
import { logout } from '@services/login/loginApi';
import Setting from './component/Setting';
import BreadcrumbNav from './component/BreadcrumbNav';
/**
 * 顶部布局内容
 */
const Header: React.FC = memo(() => {
  const { modal } = App.useApp();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  // 菜单栏
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined />,
      disabled: false,
      onClick: () => {
        // 个人中心做成一个弹窗，内部可以修改
      },
    },
    {
      key: '2',
      label: '密码修改',
      icon: <EditOutlined />,
      onClick: () => {
        alert('进行密码修改');
      },
    },
    {
      key: '3',
      label: '刷新缓存',
      icon: <SyncOutlined />,
      onClick: () => {
        // 后端的缓存信息（相当于把缓存数据刷新）
      },
    },
    {
      key: '4',
      label: '退出登录',
      icon: <LogoutOutlined />,
      disabled: false,
      onClick: function () {
        modal.confirm({
          title: '退出登录',
          icon: <ExclamationCircleOutlined />,
          content: '确认退出登录吗？',
          okText: '确认',
          onOk: function () {
            const token = sessionStorage.getItem('token');

            // 清除后端的信息
            logout(token as string);
            // 清空token
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('roleId');
            sessionStorage.removeItem('isLogin');
            sessionStorage.removeItem('loginUser');
            dispatch(clearCache());
            // 退出到登录页面
            navigate('/login');
          },
          cancelText: '取消',
        });
      },
    },
  ];

  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open('https://github.com/yecongling/fusion-admin', '_blank');
  };

  /**
   * 检索菜单
   * @param name 菜单名
   */
  const searchMenu = (name: string) => {
    console.log(name);
  };

  return (
    <>
      <Layout.Header
        className="ant-layout-header dis-fl jc-sb"
        style={{
          borderBottom: ' 1px solid #e9edf0',
        }}
      >
        <div className="dis-fl js-sb ai-ct" style={{ marginLeft: '10px' }}>
          {/* 面包屑 */}
          <BreadcrumbNav />
        </div>
        <div className="dis-fl js-sb ai-ct toolbox">
          <Space size="large">
            <Input
              variant="filled"
              placeholder="输入内容查询"
              suffix={
                <SearchOutlined
                  style={{ cursor: 'pointer', fontSize: '18px' }}
                />
              }
              onChange={(e) => searchMenu(e.target.value)}
            />
            <Tooltip placement="bottom" title="github">
              <GithubOutlined
                style={{ cursor: 'pointer', fontSize: '18px' }}
                onClick={routeGitHub}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="锁屏">
              <LockOutlined
                style={{ cursor: 'pointer', fontSize: '18px' }}
                onClick={() => {
                  dispatch(setScreenLock(true));
                }}
              />
            </Tooltip>
            {/* 邮件 */}
            <Badge count={5}>
              <MailOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
            </Badge>
            <Dropdown
              placement="bottomRight"
              dropdownRender={() => <MessageBox />}
            >
              <Badge count={5}>
                <BellOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
              </Badge>
            </Dropdown>
            <Tooltip placement="bottomRight" title="系统设置">
              <SettingOutlined
                style={{ cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setOpenSetting(true)}
              />
            </Tooltip>
            <FullScreen />
            <Dropdown menu={{ items }} placement="bottom">
              <div
                className="login-user"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  height: 50,
                  transition: 'all 0.3s',
                }}
              >
                <Avatar size="default" src={avatar} />
                <span style={{ margin: '0 0 0 6px' }}>
                  {sessionStorage.getItem('loginUser') || 'username'}
                </span>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Layout.Header>
      {/* 系统设置界面 */}
      <Setting open={openSetting} setOpen={setOpenSetting} />
    </>
  );
});
export default Header;
