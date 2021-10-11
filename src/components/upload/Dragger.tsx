import classNames from 'classnames'
import React, { useState, DragEvent } from 'react'

interface IDraggerProps {
  onFile: (files: FileList) => void
}

const Dragger: React.FC<IDraggerProps> = (props) => {
  const { onFile, children } = props
  const [draggerOver, setDraggerOver] = useState(false)
  const classes = classNames('base-uploader-dragger', {
    'is-dragover': draggerOver
  })
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDraggerOver(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDraggerOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
