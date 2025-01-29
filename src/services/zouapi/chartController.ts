// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** listTopInvokeInterfaceInfo GET /api/chart/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInvokeInterfaceInfoVO_>('/api/chart/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
