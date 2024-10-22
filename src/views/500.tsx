import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();
  return <>
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => navigate("/home")}>回到首页</Button>}
    />
  </>
};
export default App;