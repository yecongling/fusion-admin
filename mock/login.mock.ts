import { defineMock } from "rspack-plugin-mock/helper";

// 模拟数据
export default defineMock([
  {
    url: "/api/login",
    method: "POST",
    body(request) {
      return {
        code: 200,
        msg: "",
        data: {
          token: "wefewfwe",
          roleId: "admin",
          homePath: "/home",
        },
      };
    },
  },
]);
