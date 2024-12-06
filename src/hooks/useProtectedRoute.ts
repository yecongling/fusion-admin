import { checkPermission } from '@/services/system/menu/menuApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 路由权限校验hooks
 */
export const useProtectedRoute = (routePath: string) => {
  const navigate = useNavigate();
  // 是否是授权路由
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyPermission = async () => {
      // TODO: 验证用户是否拥有该路由权限
      const authorized = await checkPermission(routePath);
      setIsAuthorized(authorized);
      // 如果没有权限，则跳转到无权限页面
      if (!authorized) {
        navigate('/403');
      }
    };
    verifyPermission();
  }, [routePath, navigate]);
  return isAuthorized;
};
