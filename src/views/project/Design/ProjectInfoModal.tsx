import DragModal from '@/components/modal/DragModal';
import type { Project } from './types';
import { Form, Input, type InputRef } from 'antd';
import { useEffect, useRef } from 'react';

/**
 * 添加项目弹窗
 * @returns
 */
const ProjectInfoModal: React.FC<ProjectInfoModalProps> = (props) => {
  const { open, onOk, onCancel, project } = props;
  // 项目表单数据
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      // 聚焦第一个输入框
      inputRef.current?.focus();
      // 如果传输了数据则填充表单
      if (project) {
        form.setFieldsValue(project);
      }
    }
  }, [open]);

  /**
   * 点击确认的回调
   */
  const handleOk = () => {
    // 先保存数据

    // 然后调用ok
    onOk?.();
  };
  return (
    <DragModal
      title={project ? '编辑项目' : '新增项目'}
      onCancel={onCancel}
      onOk={handleOk}
      open={open}
    >
      <Form form={form}>
        {/* 项目名称 */}
        <Form.Item label="项目名称" name="projectName">
          <Input ref={inputRef} autoComplete="off" allowClear autoFocus />
        </Form.Item>
      </Form>
      
    </DragModal>
  );
};
export default ProjectInfoModal;

/**
 * 项目弹窗属性
 */
export interface ProjectInfoModalProps {
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

  /**
   * 项目类型
   */
  type?: string;

  /**
   * 项目数据
   */
  project?: Project;
}
