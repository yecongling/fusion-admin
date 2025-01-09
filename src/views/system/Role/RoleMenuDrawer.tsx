import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { useEffect } from 'react';

/**
 * 角色菜单授权界面
 * @returns
 */
const RoleMenuDrawer: React.FC<RoleMenuDrawerProps> = ({
  open,
  roleId,
  onOk,
  onCancel,
}) => {

  useEffect(() => {
    if (!open) return;
    // 调用获取所有菜单接口方法（里面包含获取选中的菜单key）

  }, [open]);
  /**
   * 点击确定的时候的操作
   * @param e
   */
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOk(e);
  };
  return (
    <Drawer
      title="授权菜单"
      width={400}
      open={open}
      closeIcon={false}
      extra={<Button type="text" icon={<CloseOutlined />} onClick={onCancel} />}
      onClose={onCancel}
      classNames={{ footer: 'text-right' }}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            确认
          </Button>
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
  // 角色id（通过角色id查询角色已经分配的菜单）
  roleId: string;
  // 点击确定的回调
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // 点击取消的回调
  onCancel: (e: any) => void;
};
