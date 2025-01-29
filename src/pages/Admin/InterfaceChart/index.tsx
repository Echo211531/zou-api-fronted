import { PageContainer } from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { listTopInvokeInterfaceInfoUsingGet } from '@/services/zouapi/chartController';

const InterfaceChart: React.FC = () => {

  const [data, setData] = useState<API.InvokeInterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTopInvokeInterfaceInfoUsingGet().then((res) => {
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
    });
  }, []);

  const chartInterface = data.map((item) => {   //每次迭代，从data对象数组中创建一个数组，最后集合到chartInterface中
    return {
      value: item.invokeNum,     //每次迭代时，item 将是 data 数组中的一个对象
      name: item.name,
    };
  });

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: chartInterface,
      },
    ],
  };

  return (
    <PageContainer title={'接口调用情况'}>
      <ReactECharts showLoading={loading} option={option} />
    </PageContainer>
  );
};

export default InterfaceChart;
