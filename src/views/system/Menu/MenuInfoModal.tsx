import DragModal from '@components/modal/DragModal';
import {
  Form,
  Input,
  InputNumber,
  InputRef,
  Radio,
  Switch,
} from 'antd';
import React, { useEffect, useRef } from 'react';

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
  const nameRef = useRef<InputRef>(null);

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
      nameRef.current?.focus();
    }
  };

  return (
    <DragModal
      width={800}
      styles={{
        body: {
          padding: '20px 40px',
          height: '600px',
          overflowY: 'auto',
        },
      }}
      title={currentRow ? '编辑菜单数据' : '新增菜单数据'}
      open={visible}
      onOk={() => onOk(form.getFieldsValue())}
      onCancel={onCancel}
      maskClosable={false}
      afterOpenChange={onAfterOpenChange}
    >
      <Form
        form={form}
        initialValues={{
          menuType: 2,
          isRoute: true,
          hidden: false,
          internalOrExternal: false,
          status: true,
        }}
        labelCol={{ span: 4 }}
      >
        <Form.Item name="menuType" label="菜单类型">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1}>菜单目录</Radio.Button>
            <Radio.Button value={2}>子目录</Radio.Button>
            <Radio.Button value={3}>权限按钮</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="parentId" label="上级菜单">
          <Input allowClear autoComplete="off" />
        </Form.Item>

        <Form.Item
          name={`name`}
          label="菜单名称"
          rules={[{ required: true, message: '菜单名称不能为空!' }]}
        >
          <Input autoFocus ref={nameRef} />
        </Form.Item>
        <Form.Item
          name="url"
          label="路径"
          rules={[{ required: true, message: '路径不能为空!' }]}
        >
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="component"
          label="前端组件"
          rules={[{ required: true, message: '前端组件配置不能为空!' }]}
        >
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item name="componentName" label="组件名称">
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item name="redirect" label="默认跳转地址">
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item name="Icon" label="菜单图标">
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item name="sortNum" label="排序">
          <InputNumber min={0} autoComplete="off" />
        </Form.Item>
        <Form.Item name="isRoute" label="是否路由菜单">
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>
        <Form.Item name="hidden" label="隐藏路由">
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>
        <Form.Item name="internalOrExternal" label="打开方式">
          <Switch checkedChildren="外部" unCheckedChildren="内部" />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Switch checkedChildren="正常" unCheckedChildren="停用" />
        </Form.Item>
      </Form>
    </DragModal>
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
