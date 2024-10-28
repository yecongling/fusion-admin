import React, { memo, useState } from 'react';
import {
  Col,
  ColorPicker,
  ColorPickerProps,
  Divider,
  Drawer,
  Row,
  Space,
  Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setColorPrimary, setTheme } from '@stores/store';

/**
 * 系统设置界面组件的属性配置
 */
export interface SettingProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* 系统配置界面 */
const Setting: React.FC<SettingProps> = memo(({ open, setOpen }) => {
  // 从全局状态库中获取数据
  const globalState = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const { theme, colorPrimary } = globalState;
  const [value, setValue] = useState<ColorPickerProps['value']>(colorPrimary);

  /**
   * 改变主题
   * @param checked
   */
  const changeTheme = (checked: boolean) => {
    dispatch(setTheme(checked ? 'light' : 'dark'));
  };

  return (
    <>
      <Drawer
        title="主题配置"
        placement="right"
        open={open}
        width={330}
        onClose={() => setOpen(false)}
      >
        <Divider>
          <strong>主题模式</strong>
        </Divider>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Col
              span={6}
              style={{
                textAlign: 'right',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              侧边栏
            </Col>
            <Col span={17} offset={1}>
              <Switch
                unCheckedChildren="黑暗"
                checkedChildren="明亮"
                defaultChecked
                checked={theme === 'light'}
                onChange={(checked) => changeTheme(checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col
              span={6}
              style={{
                textAlign: 'right',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              主题
            </Col>
            <Col span={17} offset={1}>
              <ColorPicker
                value={value}
                allowClear
                onChangeComplete={(color) => {
                  setValue(color);
                  dispatch(setColorPrimary(color.toHexString()));
                }}
                onClear={() => {
                  dispatch(setColorPrimary(colorPrimary));
                }}
              />
            </Col>
          </Row>
        </Space>
      </Drawer>
    </>
  );
});

Setting.propTypes = {};
export default Setting;
