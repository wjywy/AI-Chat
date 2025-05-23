import { Attachments, Sender } from '@ant-design/x'
import { useRef, useState } from 'react'
import { Button, type GetRef } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const AIRichInput = () => {
  const [open, setOpen] = useState(false)
  const attachmentsRef = useRef<GetRef<typeof Attachments>>(null)
  const senderRef = useRef<GetRef<typeof Sender>>(null)
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
      <Attachments
        ref={attachmentsRef}
        beforeUpload={() => false}
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
    </Sender.Header>
  )

  return (
    <>
      <Sender
        header={senderHeader}
        prefix={<Button type="text" icon={<LinkOutlined />} onClick={() => setOpen(!open)} />}
        onPasteFile={(_, files) => {
          for (const file of files) {
            console.log('file', file)

            attachmentsRef.current?.upload(file)
          }
          setOpen(true)
        }}
        submitType="shiftEnter"
        placeholder="请输入您的问题"
        onSubmit={() => {
          console.log('submit')
        }}
      />
    </>
  )
}

export default AIRichInput
