import { assignRoleUser, getRoleUser } from '@/services/system/role/roleApi';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { useEffect, useState } from 'react';

/**
 * 给角色分配用户
 * @returns
 */
const RoleUserDrawer: React.FC<RoleUserDrawerProps> = ({
  open,
  roleId,
  onCancel,
}) => {
  // 用户表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 添加用户弹窗的打开关闭
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    // 获取当前角色已经分配的用户
    getRoleUser(roleId).then((res) => {
      // 设置表格数据
    });
  }, [open]);

  return (
    <>
      <Drawer
        title="分配用户"
        width={720}
        open={open}
        closeIcon={false}
        extra={
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        }
        onClose={onCancel}
        classNames={{ footer: 'text-right' }}
      >
        用户表格
      </Drawer>
    </>
  );
};

export default RoleUserDrawer;

export interface RoleUserDrawerProps {
  open: boolean;
  // 角色id
  roleId: string;
  // 点击取消的回调
  onCancel: (e: any) => void;
}
