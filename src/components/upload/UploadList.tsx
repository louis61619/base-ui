import React from 'react'
import Icon from '../icon/Icon'
import Progress from '../progress/Progress'
import { IUploadFile } from './Upload'

interface IUploadListProps {
  fileList: IUploadFile[]
  onRemove: (_file: IUploadFile) => void
}

const UploadList: React.FC<IUploadListProps> = (props) => {
  const { fileList, onRemove } = props

  return (
    <ul className="base-upload-list">
      {fileList.map((item) => {
        return (
          <li className="base-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'loading' || item.status === 'ready') && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove(item)} />
            </span>
            {item.status === 'loading' && <Progress percent={item.percent || 0} />}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
