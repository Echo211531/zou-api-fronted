import { PageContainer } from '@ant-design/pro-components';
import {Badge, Button, Card, Descriptions, Divider, Form, message} from 'antd';
import React, { useEffect, useState } from 'react';
import {getInterfaceInfoVoByIdUsingGet, invokeInterfaceUsingPost} from '@/services/zouapi/interfaceInfoController';
import { useParams } from 'react-router';
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('无数据，请重试');
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoVoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error('请求失败,' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const[invokeRes,setInvokeRes]=useState<any>()
  const[invokeLoading,setInvokeLoading]=useState(false);
  const onFinish = async (values: API.InvokeInterfaceRequest) => {
    if (!params.id) {
      message.error('无数据，请重试');
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceUsingPost({
        id: Number(params.id),
        ...values,
      });
      setInvokeRes(res.data);
      message.success('调用成功!');
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setInvokeLoading(false);
  };
  return (
    <PageContainer title={'接口详情'}>
      <Card loading={loading}>
        {data ? (
          <Descriptions title={data.name} column={2} layout="vertical" bordered={true}>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="接口状态">
              {data.status === 0 ? (
                <Badge text={'关闭'} status={'default'} />
              ) : (
                <Badge text={'启用'} status={'processing'} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card title={'在线调用'}>
        <Form
          name="basic"
          layout={'vertical'}   //垂直排列
          onFinish={onFinish}   //提交时触发
        >
          <Form.Item
            label="请求参数"
            name="requestParams"
          >
            <TextArea />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="测试结果" loading={invokeLoading}>
        {invokeRes?invokeRes:null}
      </Card>
      <Divider/>
    </PageContainer>
  );
};

export default InterfaceInfo;
