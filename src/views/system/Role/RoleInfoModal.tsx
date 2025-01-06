import DragModal from '@/components/modal/DragModal';
import { Form, Input, type InputRef, Select, Switch } from 'antd';
import { useEffect, useRef } from 'react';

const RoleInfoModal: React.FC<RoleInfoModalProps> = ({
  visible,
  currentRow,
  onOk,
  onCancel,
}) => {
  // 表单实例
  const [form] = Form.useForm();
  const roleCodeRef = useRef<InputRef>(null);

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

  /**
   * 弹窗打开关闭的回调（打开后默认聚焦到名称输入框）
   * @param open 弹窗是否打开
   */
  const onAfterOpenChange = (open: boolean) => {
    if (open) {
      roleCodeRef.current?.focus();
    }
  };

  /**
   * 点击确认的时候先做数据校验
   */
  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        // 清除所有错误
        onOk(form.getFieldsValue());
      })
      .catch((errorInfo) => {
        // 滚动并聚焦到第一个错误字段
        form.scrollToField(errorInfo.errorFields[0].name);
        form.focusField(errorInfo.errorFields[0].name);
      });
  };

  return (
    <DragModal
      width="40%"
      open={visible}
      title={currentRow ? '编辑角色' : '新增角色'}
      onOk={handleOk}
      onCancel={onCancel}
      afterOpenChange={onAfterOpenChange}
    >
      <Form form={form} labelCol={{ span: 3 }} initialValues={{ status: true }}>
        <Form.Item name="id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="角色编码"
          name="roleCode"
          rules={[{ required: true, message: '请输入角色编码' }]}
        >
          <Input ref={roleCodeRef} placeholder="请输入角色编码" />
        </Form.Item>
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item name="roleType" label="角色类型">
          <Select
            placeholder="请选择角色类型"
            options={[
              { value: 0, label: '系统角色' },
              { value: 1, label: '普通角色' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="角色状态"
          rules={[{ required: true, message: '请选择角色状态' }]}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>
        <Form.Item name="remark" label="角色描述">
          <Input.TextArea placeholder="请输入角色描述" />
        </Form.Item>
      </Form>
    </DragModal>
  );
};
export default RoleInfoModal;

export type RoleInfoModalProps = {
  // 弹窗可见性
  visible: boolean;
  // 弹窗需要的数据
  currentRow: Record<string, any> | null;
  // 点击确定的回调
  onOk: (params: Record<string, string | number | boolean>) => void;
  // 点击取消的回调
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
