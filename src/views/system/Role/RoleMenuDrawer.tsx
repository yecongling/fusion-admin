import { Button, Drawer, Space } from 'antd';

/**
 * 角色菜单授权界面
 * @returns
 */
const RoleMenuDrawer: React.FC = () => {
  return (
    <Drawer
      footer={
        <Space>
          <Button>取消</Button>
          <Button type="primary">确认</Button>
        </Space>
      }
    >
      <div>菜单</div>
    </Drawer>
  );
};
export default RoleMenuDrawer;

export type RoleMenuDrawerProps = {
    open: boolean;

};
