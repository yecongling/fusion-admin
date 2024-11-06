import { Form, Modal } from 'antd';
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
    if (currentRow) {
      // 填充表单数据
      form.setFieldsValue(currentRow);
    } else {
      // 清空表单数据，表示新增
      form.resetFields();
    }
  }, [currentRow, form]);

  return (
    <Modal open={visible} onOk={() => onOk(form.getFieldsValue())} onCancel={onCancel}>
      <Form form={form}>表单</Form>
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
