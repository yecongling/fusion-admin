import { defineMock } from 'rspack-plugin-mock/helper';

// 模拟数据
export default defineMock([
  {
    url: '/api/login',
    method: 'POST',
    body(request) {
      const body = request.body;
      const { username, password } = body;
      if (username !== 'admin') {
        return {
          code: 107,
          message: '用户名不存在，请联系管理员添加!',
          data: {},
        };
      }
      if (username === 'admin' && password !== '123456qwe,.') {
        return {
          code: 108,
          message: '密码输入错误',
          data: {},
        };
      }
      return {
        code: 200,
        message: '',
        data: {
          token: 'wefewfwe',
          roleId: 'admin',
          homePath: '/home',
          username,
        },
      };
    },
  },
  {
    url: '/api/logout',
    method: 'DELETE',
    body(request) {
      const body = request.query;
      const { token } = body;
      return {
        code: 200,
        message: '',
        data: { token },
      };
    },
  },
]);
