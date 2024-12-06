import { Input, type InputRef } from 'antd';
import favicon from '@/assets/svg/vite.svg';
import { type RootState, setScreenLock } from '@/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import type React from 'react';
import { useEffect, useRef } from 'react';
import style from './screenLock.module.scss';

/**
 * 锁屏操作
 * @returns
 */
const ScreenLock: React.FC = () => {
  // 状态
  const globalState = useSelector((state: RootState) => state.globalState);
  const dispatch = useDispatch();
  const { screenLock } = globalState;
  const pwdRef = useRef<InputRef>(null);

  // 页面锁屏时，聚焦到密码框
  useEffect(() => {
    if (screenLock) {
      pwdRef.current?.focus();
    }
  }, [screenLock]);

  /**
   * 验证解锁密码
   */
  const validatePassword = (e: any) => {
    console.log(e.target.value);

    // 如果密码验证正确，则解除锁屏
    dispatch(setScreenLock(false));
  };

  return screenLock ? (
    <div className={style['screen-lock']}>
      <div className="screen-lock-content">
        <div className="screen-lock-title">
          <img src={favicon} alt="" />
          <span>系统锁屏</span>
        </div>
        <div className="screen-lock-input">
          <Input.Password
            ref={pwdRef}
            placeholder="请输入密码"
            onPressEnter={validatePassword}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ScreenLock;
