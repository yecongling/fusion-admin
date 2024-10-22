import { defineMock } from "rspack-plugin-mock/helper";

// 模拟数据
export default defineMock([
  {
    url: "/api/login",
    method: "POST",
    body(request) {
      return {};
    },
  },
]);
