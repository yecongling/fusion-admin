/**
 * 登录界面
 */
import React, { useRef, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import logo from '@assets/images/logo.png';
import {
  LockOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './login.module.scss';
import filing from '@assets/images/filing.png';
import { useNavigate } from 'react-router-dom';
import { login } from '@services/login/loginApi';
import { getMenuListByRoleId } from '@services/system/menu/menuApi';
import { useDispatch } from 'react-redux';
import { setMenus } from '@stores/store';

/**
 * 登录模块
 * @returns 组件内容
 */
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 验证码
  const [code, setCode] = useState(
    Math.floor(Math.random() * 10000).toString(),
  );

  /**
   * 登录表单提交
   * @param values 提交表单的数据
   */
  const submit = async (values: any) => {
    setLoading(true);
    // 这里考虑返回的内容不仅包括token，还包括用户登录的角色（需要存储在本地，用于刷新页面时重新根据角色获取菜单）、配置的首页地址（供登录后进行跳转）
    try {
      const {token, roleId, homePath = '/home'} = await login(values);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("roleId", roleId);
      // 登录成功根据角色获取菜单（这里暂时不判定登录失败的情况，后续添加）
      const menu = await getMenuListByRoleId({roleId});
      dispatch(setMenus(menu));
      // 跳转到首页，这里的跳转需要后续调整为从finally中去判定，登录成功后才考虑
      navigate(homePath);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取验证码
   */
  const getCode = () => {
    setCode(Math.floor(Math.random() * 10000).toString());
  };

  return (
    <>
      <div className={styles.dragArea} />
      <div className={styles['login-container']}>
        <div className={styles['login-box']}>
          {/* 左边图案和标题 */}
          <div className={styles['login-left']}>
            <div className="logo" style={{ marginTop: '60px' }}>
              <img className="login-icon" width="70" src={logo} alt="logo" />
            </div>
            <div className="title">
              <p style={{ fontSize: '20px', margin: 0 }}>
                <span
                  style={{
                    fontFamily:
                      '微软雅黑 Bold, 微软雅黑 Regular, 微软雅黑, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  集成信息管理平台
                </span>
              </p>
              <p style={{ fontSize: '14px', margin: 0 }}>
                <span
                  style={{
                    fontFamily: '微软雅黑, sans-serif',
                    fontWeight: 400,
                    color: '#999999',
                  }}
                >
                  Integration System
                </span>
              </p>
            </div>
          </div>
          {/* 右边登陆表单 */}
          <div className={styles['login-form']}>
            <div className="login-title">
              <p style={{ fontSize: '28px', textAlign: 'center', margin: 0 }}>
                <span
                  style={{
                    fontFamily:
                      '微软雅黑 Bold, 微软雅黑 Regular, 微软雅黑, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  用户登录
                </span>
              </p>
            </div>
            <div className="form" style={{ marginTop: '40px' }}>
              <Form
                form={form}
                name="login"
                labelCol={{ span: 5 }}
                initialValues={{
                  username: 'admin',
                  password: '12345678',
                  captcha: code,
                  remember: true,
                }}
                size="large"
                autoComplete="off"
                onFinish={submit}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input
                    size="large"
                    ref={inputRef}
                    autoFocus
                    allowClear
                    placeholder="用户名：admin"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    size="large"
                    allowClear
                    autoComplete="new-password"
                    placeholder="密码：12345678"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={18}>
                      <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{ required: true, message: '请输入验证码' }]}
                      >
                        <Input
                          size="large"
                          allowClear
                          placeholder="输入右侧验证码"
                          prefix={<SecurityScanOutlined />}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Button
                        size="large"
                        onClick={getCode}
                        style={{ width: '100%', backgroundColor: '#f0f0f0' }}
                      >
                        {code}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                {/* 记住密码 */}
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={loading}
                    size="large"
                    style={{ width: '100%' }}
                    type="primary"
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '440px', margin: '0 auto', padding: '20px 0' }}>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51012202001603"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            height: '20px',
            lineHeight: '20px',
          }}
        >
          <img src={filing} style={{ float: 'left' }} alt="无图片" />
          <p
            style={{
              float: 'left',
              height: '20px',
              lineHeight: '20px',
              margin: '0px 0px 0px 5px',
              color: '#939393',
            }}
          >
            川公网安备 51012202001603号
          </p>
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          style={{
            position: 'absolute',
            display: 'inline-block',
            color: '#939393',
            textDecoration: 'none',
            marginLeft: '6px',
          }}
        >
          蜀ICP备2023022276号-1
        </a>
      </div>
    </>
  );
};
export default Login;
