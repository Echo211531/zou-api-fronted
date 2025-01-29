import { Modal } from 'antd';
import React from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<boolean>;
  open: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { columns, open, onCancel, onSubmit } = props;
  return (
    <Modal title={'新建接口'} footer={null} open={open} onCancel={() => onCancel?.()}>
      <ProTable columns={columns} type={'form'}
                //设置表单提交时的处理函数。当用户提交表单时，收集的数据对象 value 会被传递给父组件的 onSubmit 函数
                onSubmit={async (value) => onSubmit?.(value)} />
    </Modal>
  );
};

export default CreateModal;
