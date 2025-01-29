import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';

export type Props = {              //定义 Props 类型
  value: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfoUpdateRequest>[];
  onCancel: () => void;         //取消按钮的回调函数
  onSubmit: (values: API.InterfaceInfoUpdateRequest) => Promise<void>;   //提交时的回调函数
  open: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { value, columns, open, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(value);
    }
  }, [value]);

  return (											//设置 Modal 的取消按钮点击事件
    <Modal title={'更新接口'} footer={null} open={open} onCancel={() => onCancel?.()}>
      <ProTable           //表格
        columns={columns}
        formRef={formRef}
        type={'form'}
        onSubmit={async (value) => onSubmit?.(value)}  //表单提交时值传给外层onSubmit ，和添加接口思路一样
        // 设置默认值
        form={{ initialValues: value }}
      />
    </Modal>
  );
};

export default UpdateModal;
