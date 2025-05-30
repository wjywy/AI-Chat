import SparkMD5 from 'spark-md5'
import { useRef, useState } from 'react'
import type { RcFile } from 'antd/es/upload'
import { LinkOutlined } from '@ant-design/icons'
import { Attachments, Sender } from '@ant-design/x'
import { Button, message, Spin, type GetRef } from 'antd'

import { useChatStore, useConversationStore, type MessageProps } from '@pc/store'
import { getCheckFileAPI, postFileChunksAPI, postMergeFileAPI } from '@pc/apis/chat'
import { sessionApi } from '@pc/apis/session'

import type { chunkItemType } from '@pc/types/chat'
import { DEFAULT_MESSAGE } from '@pc/constant'
import type { Role } from '@pc/types/common'

// 切片的大小
const CHUNK_SIZE = 1024 * 1024 * 0.5 * 0.5

const AIRichInput = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const attachmentsRef = useRef<GetRef<typeof Attachments>>(null)
  const senderRef = useRef<GetRef<typeof Sender>>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const { messages, addMessage } = useChatStore()
  const { selectedId, setSelectedId, addConversation } = useConversationStore()

  // 文件切片
  const chunkFun = (file: File) => {
    const chunksList: chunkItemType[] = []
    for (let i = 0; i < file.size; i += CHUNK_SIZE) {
      chunksList.push({ file: file.slice(i, i + CHUNK_SIZE) })
    }
    return chunksList
  }

  // 计算各个切片的hash
  const calculateChunkHash = async (fileChunks: chunkItemType[]): Promise<string[]> => {
    return Promise.all(
      fileChunks.map((chunk) => {
        return new Promise<string>((resolve, reject) => {
          const spark = new SparkMD5.ArrayBuffer()
          const reader = new FileReader()
          reader.readAsArrayBuffer(chunk.file)
          reader.onload = (e) => {
            if (e.target?.result) {
              spark.append(e.target.result as ArrayBuffer)
              resolve(spark.end())
            } else {
              reject(new Error('Failed to read chunk'))
            }
          }
          reader.onerror = () => reject(new Error('Error reading chunk'))
        })
      })
    )
  }

  const calculateFileHash = async (fileChunks: chunkItemType[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const chunks: Blob[] = []

      fileChunks.forEach((chunk, index) => {
        if (index === 0 || index === fileChunks.length - 1) {
          // 1. 第一个和最后一个切片的内容全部参与计算
          chunks.push(chunk.file)
        } else {
          // 2. 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算
          // 前面的2字节
          chunks.push(chunk.file.slice(0, 2))
          // 中间的2字节
          chunks.push(chunk.file.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
          // 后面的2字节
          chunks.push(chunk.file.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
        }
      })

      const reader = new FileReader()
      reader.readAsArrayBuffer(new Blob(chunks))
      reader.onload = (e) => {
        if (e.target?.result) {
          spark.append(e.target.result as ArrayBuffer)
          resolve(spark.end())
        } else {
          reject(new Error('Failed to read chunk'))
        }
      }
    })
  }

  const selectFile = async (file: RcFile) => {
    try {
      setIsLoading(true)
      const controller = new AbortController()
      abortControllerRef.current = controller
      const fileName = file.name
      // 创建切片
      const fileChunks = chunkFun(file)
      // 计算整个文件的hash作为fileId，尽管 file.uid 可以拿到文件唯一标识，但对于同一个文件，每次上传得到的值都是不同的
      const fileId = await calculateFileHash(fileChunks)
      // 读取各个切片的hash值
      const chunkHashVals = await calculateChunkHash(fileChunks)
      // 分片上传前的校验
      const {
        data: { fileStatus, uploaded }
      } = await getCheckFileAPI(fileId, file.name)
      if (fileStatus === 1) return message.success('文件上传成功')
      else {
        // 上传分片
        await uploadChunks(fileChunks, fileId, fileName, chunkHashVals, uploaded || [], controller)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadChunks = async (
    fileChunks: chunkItemType[],
    fileId: string,
    name: string,
    chunkHashVals: string[],
    uploaded: number[],
    controller: AbortController
  ) => {
    const promisesList = fileChunks
      .filter((_, idx) => !uploaded.includes(idx))
      .map((chunk, index) => {
        const fd = new FormData()
        fd.append('fileId', fileId)
        fd.append('fileName', name)
        fd.append('index', String(index))
        fd.append('chunkHash', chunkHashVals[index])
        fd.append('chunk', chunk.file)

        return postFileChunksAPI(fd, controller.signal)
      })

    try {
      await Promise.all(promisesList)
      const {
        data: { fileName, filePath }
      } = await postMergeFileAPI({
        fileId,
        fileName: name,
        totalChunks: fileChunks.length
      })
      // 做后续的存储操作 - 如果需要的话
      console.log('fileName, filePath', fileName, filePath)
    } catch (_) {
      console.log('err', '分片上传失败')
    }
  }

  // 粘贴上传/文件框选择上传都会拦截至此处
  const handleFileUpload = (file: RcFile) => {
    selectFile(file)
    return false
  }

  // 取消文件上传
  const cancleUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort() // 取消所有分片请求
      abortControllerRef.current = null
    }
  }

  const submitMessage = async (message: string) => {
    if (!selectedId) {
      const { data } = await sessionApi.createChat('demo')
      const { id, title } = data
      setSelectedId(id)
      addConversation({ id, title })
    }

    const ans: MessageProps = {
      content: message,
      role: 'user'
    }

    addMessage(ans)
  }

  const senderHeader = (
    <Sender.Header
      title="Attachments"
      styles={{
        content: {
          padding: 0
        }
      }}
      open={open}
      onOpenChange={setOpen}
      forceRender>
      <Spin
        spinning={isLoading}
        tip={
          <span
            style={{
              fontSize: '12px',
              color: '#ff4f39'
            }}
            onClick={cancleUpload}>
            点击取消
          </span>
        }>
        <Attachments
          ref={attachmentsRef}
          beforeUpload={handleFileUpload}
          placeholder={(type) =>
            type === 'drop'
              ? {
                  title: '请将文件拖拽至此处'
                }
              : {
                  title: '文件上传',
                  description: '点击或拖拽上传文件'
                }
          }
          getDropContainer={() => senderRef.current?.nativeElement}
        />
      </Spin>
    </Sender.Header>
  )

  const showDefaultMessage = () => {
    if (!selectedId) {
      return <div className="text-2xl font-bold mb-10 text-center">{DEFAULT_MESSAGE}</div>
    }

    const chatInfo = messages.get(selectedId)

    if (chatInfo?.length !== 0) {
      return null
    }
  }

  return (
    <>
      <div className={`fixed w-1/2 z-50 ${!selectedId ? 'bottom-1/2' : 'bottom-8'}`}>
        {showDefaultMessage()}
        <Sender
          style={{ backgroundColor: 'white' }}
          header={senderHeader}
          prefix={<Button type="text" icon={<LinkOutlined />} onClick={() => setOpen(!open)} />}
          onPasteFile={(_, files) => {
            for (const file of files) {
              // 生成base64临时图片路径
              attachmentsRef.current?.upload(file)
            }
            setOpen(true)
          }}
          submitType="shiftEnter"
          placeholder="请输入您的问题"
          onSubmit={(message) => submitMessage(message)}
        />
      </div>
    </>
  )
}

export default AIRichInput
