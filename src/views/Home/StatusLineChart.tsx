import type React from 'react';
import { useEffect, useRef } from 'react';
import echarts from '@/config/echartsConfig';

/**
 * 状态折线图
 * @returns
 */
const StatusLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();
  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: 'svg'
    });

    const option = {
      title: {
        text: '按需加载示例',
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar', // 柱状图
          data: [5, 20, 36, 10, 10, 20, 30],
        },
        {
          name: '增长',
          type: 'line', // 折线图
          data: [3, 15, 22, 8, 13, 25, 32],
        },
      ],
    };

    chartInstance.current.setOption(option);
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);
  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
export default StatusLineChart;
