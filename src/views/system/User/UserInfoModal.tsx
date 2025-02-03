import DragModal from '@/components/modal/DragModal';
import { Form } from 'antd';
import { useEffect } from 'react';

interface UserInfoModalProps {
  visible: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  userInfo?: any; // 如果有数据，则编辑，否则新增
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  visible,
  onOk,
  onCancel,
  userInfo,
}) => {
  const [form] = Form.useForm();

  // 初始化表单数据
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo);
    }
  }, [userInfo, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <DragModal open={visible} onCancel={onCancel}>
      <Form form={form}>
        {/* 表单字段 */}
      </Form>
    </DragModal>
  );
};

export default UserInfoModal;
