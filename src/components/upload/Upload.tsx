import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'
import Icon from '../icon/Icon'
import UploadList from './UploadList'
import Dragger from './Dragger'

export type UploadFileStatus = 'ready' | 'loading' | 'success' | 'error'

export interface IUploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface IUploadProps {
  action: string
  defaultFileList?: IUploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: IUploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
}

const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const [fileList, setFileList] = useState<IUploadFile[]>(defaultFileList || [])
  const fileInput = useRef<HTMLInputElement>(null)

  const updateFileList = (updateFile: IUploadFile, updateObject: Partial<IUploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObject
          }
        } else {
          return file
        }
      })
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const _file: IUploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    // 為了避免上傳多個文件導致fileList衝突
    setFileList((preList) => {
      return [_file, ...preList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'loading' })
            onProgress && onProgress(percentage, file)
          }
        }
      })
      .then((res) => {
        // console.log(res)
        updateFileList(_file, { status: 'success', response: res.data })
        onSuccess && onSuccess(res.data, file)
        onChange && onChange(file)
      })
      .catch((err) => {
        console.error(err)
        updateFileList(_file, { status: 'error', error: err })
        onError && onError(err, file)
        onChange && onChange(file)
      })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleRemove = (file: IUploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  return (
    <div className="base-upload-component">
      {/* <Button btnType="primary" >
        Upload file
      </Button> */}
      <div className="base-upload-input" onClick={handleClick} style={{ display: 'inline-block' }}>
        {drag ? (
          <Dragger onFile={(files) => uploadFiles(files)}>
            <div className="base-upload-dragger-inner">
              {children || (
                <>
                  <Icon icon="upload" size="5x" theme="secondary" />
                  <br />
                  <p>Drag file over to upload</p>
                </>
              )}
            </div>
          </Dragger>
        ) : (
          children
        )}
        <input
          className="base-file-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          type="file"
          ref={fileInput}
          accept={accept}
          multiple={multiple}
        ></input>
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload
