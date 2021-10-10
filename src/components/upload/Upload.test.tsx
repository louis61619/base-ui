import '@testing-library/jest-dom/extend-expect'
// jest-dom 提供了更多其他方法
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'

// import Icon from '../icon/Icon'
import Upload, { IUploadProps } from './Upload'

// 重寫組件 轉為顯示文字
jest.mock('../icon/Icon', () => {
  return (props: any) => {
    const { icon, onClick } = props
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const testProps: IUploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult,
  fileInput: HTMLInputElement,
  uploadArea: HTMLElement,
  dragger: HTMLElement

const testFile = new File(['test'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.base-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('click to upload') as HTMLElement
    dragger = wrapper.container.querySelector('.base-uploader-dragger') as HTMLElement
  })
  it('upload process should be fine', async () => {
    const { queryByText } = wrapper

    // 重寫第三方庫中的方法
    // 1.
    // mockAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'ok' })
    // })
    // 2.
    mockAxios.post.mockResolvedValue({ data: 'ok' })

    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('ok', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    // remove file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png'
      })
    )
  })
  it('drag and drop should work fine', async () => {
    mockAxios.post.mockResolvedValue({ data: 'ok' })
    fireEvent.dragOver(dragger)
    expect(dragger).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(dragger).not.toHaveClass('is-dragover')
    // fireEvent.drop(dragger, { dataTransfer: { files: [testFile] } })

    // 使用createEvent模擬drop行為
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile]
      }
    })
    fireEvent(dragger, mockDropEvent)

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('ok', testFile)
  })
})
