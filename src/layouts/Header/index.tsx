import {
  BellOutlined,
  GithubOutlined,
  LockOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Input, Layout, Space, Tooltip } from 'antd';
import type React from 'react';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import MessageBox from './component/MessageBox';
import FullScreen from './component/FullScreen';
import Setting from './component/Setting';
import BreadcrumbNav from './component/BreadcrumbNav';
import UserDropdown from './component/UserDropdown';
import { updatePreferences } from '@/stores/store';
/**
 * 顶部布局内容
 */
const Header: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [openSetting, setOpenSetting] = useState<boolean>(false);

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
        {/* 面包屑 */}
        <BreadcrumbNav />
        <Space size="large" className="dis-fl js-sb ai-ct toolbox">
          <Input
            variant="filled"
            placeholder="输入内容查询"
            suffix={
              <SearchOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
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
                dispatch(updatePreferences('widget', 'lockScreen', true));
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
          {/* 用户信息 */}
          <UserDropdown />
        </Space>
      </Layout.Header>
      {/* 系统设置界面 */}
      <Setting open={openSetting} setOpen={setOpenSetting} />
    </>
  );
});
export default Header;
