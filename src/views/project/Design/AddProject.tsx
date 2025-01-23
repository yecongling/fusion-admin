import DragModal from '@/components/modal/DragModal';

/**
 * 添加项目弹窗
 * @returns
 */
const AddProject: React.FC<AddProjectProps> = (props) => {
  const { open, onOk, onCancel } = props;

  /**
   * 点击确认的回调
   */
  const handleOk = () => {
    // 先保存数据
    // 然后调用ok
    onOk?.();
  };
  return (
    <DragModal onCancel={onCancel} onOk={handleOk} open={open}>
      项目类型
    </DragModal>
  );
};
export default AddProject;

export interface AddProjectProps {
  /**
   * 窗口是否打开
   */
  open: boolean;
  /**
   * 窗口确认按钮点击回调
   * @returns
   */
  onOk?: () => void;
  /**
   * 窗口取消按钮点击回调
   * @returns
   */
  onCancel?: () => void;
}
