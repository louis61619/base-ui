import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import AutoComplete, { IAutoCompleteProps } from './AutoComplete'

// npm test -- -t "auto"

// 透過這個設置能讓測試不被動畫效果干擾
config.disabled = true

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 }
]

const testProps: IAutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test auto complete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}></AutoComplete>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // enter input value
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion item
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first itme
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // input value is changed
    expect(inputNode.value).toEqual('ab')
  })
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firestResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firestResult).toHaveClass('is-active')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')

    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firestResult).toHaveClass('is-active')

    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })

    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generator template', () => {})
  it('async fetchSeggestions should work fine', () => {})
})
