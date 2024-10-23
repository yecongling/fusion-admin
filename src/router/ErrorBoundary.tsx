import { useErrorBoundary } from "react-error-boundary";

/**
 * 错误边界的响应
 * @param param0 
 * @returns 
 */
export function ErrorFallback({ error }: any) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>组件渲染出现异常，错误:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>重试</button>
    </div>
  );
}
