import React from "react";

/**
 * 错误边界组件（用于单个页面渲染错误的时候显示，单个模块渲染失败不应该影响整个系统的渲染失败）
 */
export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <h1 style={{ color: "red" }}>
          组件渲染异常， 错误： {this.state.errorInfo}
        </h1>
      );
    }
    return this.props.children;
  }
}
