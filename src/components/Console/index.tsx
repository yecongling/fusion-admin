import DragModal from '@components/modal/DragModal';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

/**
 * 弹窗监控台
 * @returns
 */
const Console: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  // 控制台需要显示的消息
  const [message, setMessage] = useState<string[]>([]);
  // socket 实例
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 初始化的时候绑定键盘事件
    document.addEventListener('keyup', keyupEvent, false);
    // 初始化websocket（@TODO 这里暂时这么写 - 后续封装到全局只需要一个websocket实例）
    socketRef.current = io('http://localhost:8891');

    return () => {
      // 销毁键盘事件
      document.removeEventListener('keyup', keyupEvent, false);
      // 关闭socket
      socketRef.current?.disconnect();
    };
  }, []);

  // 监听窗口开启的时候才开启websocket的消息接收
  useEffect(() => {
    if (open && socketRef.current?.connected) {
      // 建立连接
      socketRef.current.on('connect', () => {
        console.log('connect');
      });

      // 接收消息
      socketRef.current.on('message', (data: string) => {
        setMessage((prev) => [...prev, data]);
        console.log(`收到的消息：${data}`);
      });

      // 发送消息
      socketRef.current.emit('message', 'Hello World');
    }
  }, [open]);

  /**
   * 监听键盘事件
   * @param e
   */
  const keyupEvent = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      setOpen(false);
    }
    if (e.ctrlKey && e.code === 'F11') {
      setOpen(true);
    }
  };

  return (
    <DragModal
      open={open}
      wrapClassName="ant-modal-wrap-console"
      title="监控台（Esc关闭）"
      width={380}
      style={{ top: 60, right: 26, position: 'absolute', zIndex: 1000 }}
      styles={{
        body: {
          height: 'calc(100vh - 160px)',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: 'aliceblue',
        },
      }}
      footer={null}
      onCancel={() => setOpen(false)}
    >
      {message}
      console监控台，这里填写监控到的执行的SQL
    </DragModal>
  );
};
export default Console;
