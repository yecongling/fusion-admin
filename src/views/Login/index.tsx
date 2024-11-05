/**
 * 登录界面
 */
import React, { useEffect, useRef, useState } from 'react';
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
import { getCaptcha, login } from '@services/login/loginApi';
import { getMenuListByRoleId } from '@services/system/menu/menuApi';
import { useDispatch } from 'react-redux';
import { setMenus } from '@stores/store';
import { HttpCodeEnum } from '@enums/httpEnum';
import { antdUtils } from '@utils/antdUtil';

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
  // 验证码（后续更改从后端获取）
  const [code, setCode] = useState<string>('');

  // 页面挂载请求后端获取验证码
  useEffect(() => {
    getCode();
  }, []);

  /**
   * 登录表单提交
   * @param values 提交表单的数据
   */
  const submit = async (values: any) => {
    setLoading(true);
    // 这里考虑返回的内容不仅包括token，还包括用户登录的角色（需要存储在本地，用于刷新页面时重新根据角色获取菜单）、配置的首页地址（供登录后进行跳转）
    try {
      const { code, data, message } = await login(values);

      // 根据code判定登录状态（和枚举的状态码进行判定） 只会存在几种情况，用户名不存在，用户名或密码错误，用户名冻结，验证码错误或者过期
      // case中使用{}包裹的目的是为了保证变量做用于仅限于case块
      switch (code) {
        // 用户名不存在或禁用
        case HttpCodeEnum.RC107:
        case HttpCodeEnum.RC102:
          form.setFields([{ name: 'username', errors: [message] }]);
          break;
        // 密码输入错误
        case HttpCodeEnum.RC108:
          form.setFields([{ name: 'password', errors: [message] }]);
          break;
        // 验证码错误或过期
        case HttpCodeEnum.RC300:
        case HttpCodeEnum.RC301:
          form.setFields([{ name: 'captcha', errors: [message] }]);
          // 刷新验证码
          getCode();
          break;
        // 登录成功
        case HttpCodeEnum.SUCCESS:
          {
            const { token, roleId, homePath = '/home', username } = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('isLogin', 'true');
            sessionStorage.setItem('roleId', roleId);
            // 存储登录的用户名
            sessionStorage.setItem('loginUser', username);
            // 登录成功根据角色获取菜单
            const menu = await getMenuListByRoleId({ roleId });
            dispatch(setMenus(menu));
            // 跳转到首页
            navigate(homePath);
          }
          break;
        default:
          // 默认按登录失败处理
          antdUtils.modal?.error({
            title: '错误提示',
            content: (
              <>
                <p>登录失败：错误状态码:{code}</p>
                <p>失败原因:{message}</p>
              </>
            ),
          });
          break;
      }
    } catch (error: any) {
      antdUtils.modal?.error({ title: '错误提示', content: error });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取验证码
   */
  const getCode = async () => {
    const code = await getCaptcha();
    setCode(code);
    // TODO 这里暂时将验证码设置到输入框中，后续更改为用户输入
    form.setFieldValue('captcha', code);
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
                  融合管理平台
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
                  Fusion Admin
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
                  password: '123456qwe,.',
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
                    autoComplete="off"
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
                    autoComplete="off"
                    placeholder="密码：123456qwe,."
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
          rel="noreferrer"
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
          rel="noreferrer"
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
