import { EventSourcePolyfill } from 'event-source-polyfill'

import { BASE_URL } from '@pc/constant'
import { useUserStore } from '@pc/store'
import { request } from '@pc/utils/index'

import { type Data } from '../utils/request'

import type { checkRespType, mergeChunkType, mergeResType, SendMessageType } from '@pc/types/chat'

/**
 * 检查已上传的文件分片
 */
export const getCheckFileAPI = (fileId: string, fileName: string, chatId?: string) => {
  return request<checkRespType>(
    `/file/check?fileId=${fileId}&fileName=${fileName}&chatId=${chatId}`
  )
}

/**
 * 分片上传
 * @param data 文件对象
 */
export const postFileChunksAPI = (data: FormData, signal?: AbortSignal) => {
  return request<{
    chunkHash: string
  }>('/file/upload', 'POST', data, {
    signal
  })
}

/**
 * 分片合并
 */
export const postMergeFileAPI = (data: mergeChunkType) => {
  return request<mergeResType>('/file/merge', 'POST', data)
}

// 发送消息
export const sendChatMessage = (data: SendMessageType): Promise<Data<object>> => {
  return request('chat/sendMessage', 'POST', data)
}

// 建立sse连接
export const createSSE = (chatId: string) => {
  const { token } = useUserStore.getState()
  return new EventSourcePolyfill(`${BASE_URL}/chat/getChat/${chatId}`, {
    headers: {
      Authorization: token || ''
    }
  })
}
