import React, { useContext, useState, cloneElement, useRef, useEffect } from 'react'

import { IMenuItemProps } from './MenuItem'
import { MenuContext } from './Menu'

import Icon from '../icon'

import classNames from 'classnames'

export interface ISubMenuProps {
  index?: string
  title?: string
  className?: string
}

const renderSubMenu = (
  children: React.ReactNode,
  isOpen: boolean,
  updateChildIndex: (menuIemIndex: string[]) => void,
  index?: string
) => {
  if (typeof index !== 'string') return
  const classes = classNames('base-submenu', {
    'is-open': isOpen
  })
  const renderChildren = (children: React.ReactNode) => {
    const menuItemIndex: string[] = []
    const childrenComponent = React.Children.map(children, (child, subIndex) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const itemIndex = childElement.props.index || `${index}-${subIndex}`
      const { displayName } = childElement.type
      // 獲取所有menuItem的index
      menuItemIndex.push(itemIndex)
      // 只能渲染為MenuItem的子組件
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, {
          index: itemIndex
        })
      }
    })
    updateChildIndex(menuItemIndex)
    return childrenComponent
  }
  return <ul className={classes}>{renderChildren(children)}</ul>
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const { index, title, className, children } = props

  const context = useContext(MenuContext)
  const defaultOpenSubMenus = context.defaultOpenSubMenus as string[]
  const defaultOpen =
    index && context.mode === 'vertical' ? defaultOpenSubMenus.includes(index) : false

  console.log(defaultOpen)

  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isActive, setIsAcitve] = useState(false)
  const childIndex = useRef<string[]>([])

  // 要判斷子元素是否為acitve
  const classes = classNames('base-menu-item base-submenu-item', className, {
    'is-active': isOpen || isActive,
    'is-vertical': context.mode === 'vertical'
  })

  const updateChildIndex = (menuItemIndex: string[]) => {
    childIndex.current = menuItemIndex
  }

  // 子元素被選中默認開啟
  useEffect(() => {
    const isAcitve = childIndex.current.indexOf(context.index) !== -1
    setIsAcitve(isAcitve)
    if (context.mode === 'vertical') {
      setIsOpen(isAcitve)
    }
  }, [childIndex, context.index, context.mode])

  const handleClick = (e: React.MouseEvent) => {
    // 阻止默認行為
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  // 簡單防抖
  let timer: any
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setIsOpen(toggle)
    }, 300)
  }

  const clickEvent = context.mode === 'vertical' && {
    onClick: handleClick
  }

  const hoverEvent = context.mode === 'horizontal' && {
    onMouseEnter: (e: React.MouseEvent) => handleHover(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleHover(e, false)
  }

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div {...clickEvent} className="submenu-title">
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderSubMenu(children, isOpen, updateChildIndex, index)}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
