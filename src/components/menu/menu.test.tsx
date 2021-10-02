import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Menu, { IMenuProps } from './Menu'
import MenuItem, { IMenuItemProps } from './MenuItem'

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  classname: 'test',
  mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>default</MenuItem>
      <li>584848</li>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test menu and menuItem component', () => {
  // 在每個測試用例開始的時候都會跑
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct menu and menuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('base-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('base-menu-item is-active')
    expect(disabledElement).toHaveClass('base-menu-item is-disabled')
  })

  it('click menu item and should change active class add called right callback', () => {
    const thirdItem = wrapper.getByText('default')
    // 觸發點擊事件
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    // 會回調index
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // 測試disabled
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when prop set mode vertical', () => {
    // 清除beforeEach
    // cleanup()
    expect(menuElement).toHaveClass('base-menu_vertical')
  })
})
