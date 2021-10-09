import classNames from 'classnames'
import React, { createContext, FC, useState } from 'react'
import { IMenuItemProps } from './MenuItem'
import { ISubMenuProps } from './Submenu'

type MenuModel = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface IMenuProps {
  defaultIndex?: string
  classname?: string
  style?: React.CSSProperties
  mode?: MenuModel
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuModel
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

// 透過自訂rendre去添加默認index
export const renderChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<IMenuItemProps | ISubMenuProps>
    const customeIndex = childElement.props.index
    const { displayName } = childElement.type
    if (displayName === 'MenuItem') {
      // 透過clone element添加props
      return React.cloneElement(childElement, {
        index: customeIndex || index.toString()
      })
    }
    if (displayName === 'SubMenu') {
      return React.cloneElement(childElement, {
        index: customeIndex || index.toString()
      })
    }
  })
}

const Menu: FC<IMenuProps> = (props) => {
  const {
    defaultIndex,
    classname,
    style,
    mode,
    onSelect,
    children,
    defaultOpenSubMenus = []
  } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const classes = classNames('base-menu', classname, {
    'base-menu-vertical': mode === 'vertical',
    'base-menu-horizontal': mode === 'horizontal'
  })

  const handleSelect = (index: string) => {
    setCurrentIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentIndex ? currentIndex : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren(children)}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export default Menu
