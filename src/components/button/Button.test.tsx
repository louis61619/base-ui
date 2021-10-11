import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

test('my first react test case', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})

// 分類
describe('test button component', () => {
  // 可以寫it和test
  it('should render the correct default component', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeTruthy()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on deffirent props', () => {})
  it('should render a link when btn type equals link and href is provided', () => {})
  it('should render desable button when desabled is set to true', () => {})
})
