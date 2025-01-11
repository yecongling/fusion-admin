import DragModal from '@/components/modal/DragModal';
import { Card } from 'antd';

/**
 * 添加用户弹窗
 * @returns
 */
const AddUser: React.FC<AddUserProps> = ({ open, onOk, onCancel }) => {
  return (
    <DragModal open={open} onCancel={onCancel} title="添加用户">
      <Card>筛选框</Card>
      <Card>表格</Card>
    </DragModal>
  );
};
export default AddUser;

export interface AddUserProps {
  open: boolean;
  onOk: (params: Record<string, string | number | boolean>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
