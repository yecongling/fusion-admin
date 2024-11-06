import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

/**
 * 菜单信息编辑弹窗
 * @returns
 */
const MenuInfoModal: React.FC<MenuInfoModalProps> = ({
  visible,
  currentRow,
  onOk,
  onCancel,
}) => {
  // 表单实例
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;
    if (currentRow) {
      // 填充表单数据
      form.setFieldsValue(currentRow);
    } else {
      // 清空表单数据，表示新增
      form.resetFields();
    }
  }, [currentRow, form, visible]);

  return (
    <Modal
      title={currentRow ? '编辑菜单数据' : '新增菜单数据'}
      open={visible}
      onOk={() => onOk(form.getFieldsValue())}
      onCancel={onCancel}
    >
      <Form form={form}>
        <Form.Item name={`name`} label="菜单名称">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default MenuInfoModal;

// 菜单信息弹窗的参数
export type MenuInfoModalProps = {
  // 弹窗可见性
  visible: boolean;
  // 弹窗需要的数据
  currentRow: Record<string, any> | null;
  // 点击确定的回调
  onOk: any;
  // 点击取消的回调
  onCancel: any;
};
