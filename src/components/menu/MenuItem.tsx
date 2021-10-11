import React, { useContext } from 'react'
import classNames from 'classnames'

import { MenuContext } from './Menu'

export interface IMenuItemProps {
  index?: string
  classname?: string
  style?: React.CSSProperties
  disabled?: boolean
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, classname, style, disabled, children } = props

  const context = useContext(MenuContext)

  const classes = classNames('base-menu-item', classname, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleSelect = () => {
    // 判斷有傳入index 以及 不為disabled
    context.onSelect && !disabled && typeof index === 'string' && context.onSelect(index)
  }

  return (
    <li className={classes} style={style} onClick={handleSelect}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
// tsrafc
