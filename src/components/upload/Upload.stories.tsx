import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'

import Upload, { IUploadFile } from './Upload'

export default {
  title: 'Components/Upload',
  component: Upload
} as ComponentMeta<typeof Upload>

const defaultFileList: IUploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'loading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

export const UploadFile: Story = () => {
  // const checkFileSize = (file: File) => {
  //   if (Math.round(file.size / 1024) > 50) {
  //     alert('file to big')
  //     return false
  //   }
  //   return true
  // }

  // const filePromise = (file: File) => {
  //   const newFile = new File([file], 'xx.docx', { type: file.type })
  //   return Promise.resolve(newFile)
  // }

  return (
    <Upload
      defaultFileList={defaultFileList}
      // beforeUpload={filePromise}
      name="fileName"
      data={{ key: '464846' }}
      headers={{ 'X-Powered-By': 'louis' }}
      action="https://jsonplaceholder.typicode.com/posts"
      multiple
      drag
    />
  )
}

UploadFile.storyName = 'drag and upload file'
