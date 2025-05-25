import type { checkRespType, mergeChunkType, mergeResType } from '@pc/types/chat'
import { request } from '@pc/utils/index'

/**
 * 检查已上传的文件分片
 */
export const getCheckFileAPI = (
  fileId: string,
  fileName: string,
  chatId: string = 'c76582be-be52-4bec-a071-3f059d2bad6e'
) => {
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
