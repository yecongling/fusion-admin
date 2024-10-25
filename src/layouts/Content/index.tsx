import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 中间主内容区域
 * @returns
 */
const Content: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default Content;
