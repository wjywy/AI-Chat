export type mergeChunkType = {
  fileId: string
  fileName: string
  totalChunks: number
}

export type chunkItemType = {
  file: Blob
}

/**
 * fileStatus: 当前文件上传的状态，0 -> 未上传切片 1 -> 切片全部上传完成 2 -> 上传了部分切片
 */
export type checkRespType = {
  fileStatus: 0 | 1 | 2
  isCompleted: boolean
  uploaded?: number[]
  uploadedChunks?: number
  filePath?: string
  fileName?: string
}

export type mergeResType = {
  filePath: string
  fileName: string
}
