import { defineMock } from 'rspack-plugin-mock/helper';

// 模拟数据
export default defineMock([
  {
    url: '/api/login',
    method: 'POST',
    body(request) {
      const body = request.body;
      const { username, password } = body;
      if (username !== 'admin' || password !== '12345678') {
        return {
          code: 500,
          msg: '用户名或密码输入错误',
          data: {},
        };
      }
      return {
        code: 200,
        msg: '',
        data: {
          token: 'wefewfwe',
          roleId: 'admin',
          homePath: '/home',
        },
      };
    },
  },
]);
